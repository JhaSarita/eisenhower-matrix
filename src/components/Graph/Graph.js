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
            var responseData = [];
            responseData.push(await response.json());

            const data = responseData[0];
            const objectData = [];

            Object.keys(data).forEach(key => {
                objectData.push(data[key]);
              });

            const doFirstTasksList = objectData.filter(tasks => 
                tasks.importancePriority === 1 && tasks.urgencyPriority === 0)
                .map(tasks => tasks.name);

            const delegateTasksList = objectData.filter(tasks => 
                tasks.importancePriority === 0 && tasks.urgencyPriority === 0)
                .map(tasks => tasks.name);
            
            const scheduleTasksList = objectData.filter(tasks => 
                tasks.importancePriority === 1 && tasks.urgencyPriority === 1)
                .map(tasks => tasks.name);

            const dontDoTasksList = objectData.filter(tasks => 
                tasks.importancePriority === 0 && tasks.urgencyPriority === 1)
                .map(tasks => tasks.name);

            // set state for each task 
            setMatrixDataDoFirst(doFirstTasksList);
            setMatrixDataSchedule(scheduleTasksList);
            setMatrixDataDelegate(delegateTasksList);
            setMatrixDataDontDo(dontDoTasksList)
        }
        getMatrixData();
    }, [matrixDataDoFirst, matrixDataSchedule, matrixDataDelegate, matrixDataDontDo])
    return (
        <Fragment>
        <AddTask />
        <table className={classes.table}>
            <tr>
                <td><DoFirst data={matrixDataDoFirst}/></td>
                <td><Schedule data={matrixDataSchedule}/></td>
            </tr>
            <tr>
                <td><Delegate data={matrixDataDelegate}/></td>
                <td><DontDo data={matrixDataDontDo}/></td>
            </tr>
        </table>
        </Fragment>
    )
};

export default Graph;