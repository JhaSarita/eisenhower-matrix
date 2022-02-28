import { Fragment, useState } from "react";

import AddTaskForm from "./AddTaskForm";

import classes from './AddTask.module.css';

const AddTask = () => {

    const [formFill, setFormFill] = useState(false);

    const addTaskToListHandler = () => {
        setFormFill(true);
    }

    const onCancelHandler = () => {
        setFormFill(false);
    }

    return (
        <Fragment>
            { !formFill && <button onClick={addTaskToListHandler} className= {`${classes.button}`}>Add Task</button> }
            { formFill && <AddTaskForm onCancel={onCancelHandler}/> }
        </Fragment>
    )
};

export default AddTask;