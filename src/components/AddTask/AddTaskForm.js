import { Fragment, useRef, useState } from 'react';

import classes from './AddTaskForm.module.css';

const AddTaskForm = (props) => {

    const [importanceCheckbox, setImportanceCheckbox] = useState(0);
    const [urgencyCheckbox, setUrgencyCheckbox] = useState(0);

    const taskNameRef = useRef();
    
    const importanceCheckboxHandler = (event) => {
        if(event.target.checked) {
            setImportanceCheckbox(1);
        }  
    }

    const urgencyCheckboxHandler = (event) => {
        if(event.target.checked) {
            setUrgencyCheckbox(1);
        }
    }
    const submitTaskHandler = () =>  {
        const result = {
            id : Math.floor(Math.random() * 100),
            name : taskNameRef.current.value,
            importancePriority : importanceCheckbox,
            urgencyPriority : urgencyCheckbox
        }

        const submitTaskData = async () => {
            const responseJSON = await fetch('https://matrix-2bb5b-default-rtdb.firebaseio.com/matrix.json', {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body : JSON.stringify(result)

            });
            const content = await responseJSON.json();
        }
        setImportanceCheckbox(0);
        setUrgencyCheckbox(0);
        submitTaskData();
    }

    return(
        <Fragment>
            <form className={classes.formContainer}>
                <div className={classes.formContent}>
                    <label htmlFor="Task name">Task Name : </label>
                    <input type="text" id="name" ref={taskNameRef} />
                </div>
                <div>
                    <p>Please set the Task priority </p>
                </div>
                <div>
                    <label htmlFor="important">Important : </label>
                    <input type="checkbox" name="importance" value="0" onChange={importanceCheckboxHandler} />
                    
                </div>
                <div>
                    <label htmlFor="urgency">Urgent : </label>
                    <input type="checkbox" name="urgency" value="0" onChange={urgencyCheckboxHandler} />
                </div>
                <div className={classes.submitTaskButton}>
                <button onClick={submitTaskHandler} className={classes.button} type="button">Submit task</button>
                <button onClick={props.onCancel} className={classes.button} type="button" >Cancel</button>
                </div>
                
            </form>
        </Fragment>
    )
};


export default AddTaskForm;