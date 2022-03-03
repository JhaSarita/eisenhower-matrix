import React, { Fragment, useEffect, useState } from "react";

import classes from './Graph.module.css';

import AddTask from "../AddTask/AddTask";
import DoFirst from "../DoFirst/DoFirst";
import Schedule from "../Schedule/Schedule";
import Delegate from "../Delegate/Delegate";
import DontDo from "../DontDo/DontDo";

const Graph = () => {

    const [matrixDataDoFirst, setMatrixDataDoFirst] = useState([]);
    const [matrixDataSchedule, setMatrixDataSchedule] = useState([]);
    const [matrixDataDelegate, setMatrixDataDelegate] = useState([]);
    const [matrixDataDontDo, setMatrixDataDontDo] = useState([]);

    useEffect(() => {
    const getMatrixData = async () => { 
        const response = await fetch('https://matrix-2bb5b-default-rtdb.firebaseio.com/matrix.json');
        const data = await response.json();
        const loadedTasks = [];

        for(const key in data) {
            loadedTasks.push({
                id : key,
                name : data[key].name,
                importancePriority : data[key].importancePriority,
                urgencyPriority : data[key].urgencyPriority
            })
        }

        // filter out different categories of tasks from the response
        const doFirstTasksList = loadedTasks.filter(tasks => 
            tasks.importancePriority === 1 && tasks.urgencyPriority === 0)
            .map(tasks => tasks.name);

        const delegateTasksList = loadedTasks.filter(tasks => 
            tasks.importancePriority === 0 && tasks.urgencyPriority === 0)
            .map(tasks => tasks.name);
        
        const scheduleTasksList = loadedTasks.filter(tasks => 
            tasks.importancePriority === 1 && tasks.urgencyPriority === 1)
            .map(tasks => tasks.name);

        const dontDoTasksList = loadedTasks.filter(tasks => 
            tasks.importancePriority === 0 && tasks.urgencyPriority === 1)
            .map(tasks => tasks.name);

        // set state for each task 
        setMatrixDataDoFirst(doFirstTasksList);
        setMatrixDataSchedule(scheduleTasksList);
        setMatrixDataDelegate(delegateTasksList);
        setMatrixDataDontDo(dontDoTasksList)
    };
    getMatrixData();
    }, [matrixDataDoFirst, matrixDataSchedule, matrixDataDelegate, matrixDataDontDo]);

    return (
        <Fragment>
        <AddTask />
        <table className={classes.table}>
            <tbody><tr>
                <td><DoFirst data={matrixDataDoFirst}/></td>
                <td><Schedule data={matrixDataSchedule}/></td>
            </tr>
            <tr>
                <td><Delegate data={matrixDataDelegate}/></td>
                <td><DontDo data={matrixDataDontDo}/></td>
            </tr>
            </tbody>
        </table>
        </Fragment>
    )
};

export default Graph;