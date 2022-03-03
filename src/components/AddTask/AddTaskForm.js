import { Fragment, useRef } from 'react';

import classes from './AddTaskForm.module.css';

const AddTaskForm = (props) => {

    const taskNameRef = useRef();
    const importanceCheckboxRef = useRef();
    const urgencyCheckboxRef = useRef();
    
    const submitTaskHandler = () =>  {
        let id = Math.floor(Math.random() * 100);
        let name = taskNameRef.current.value.trim();
        if(name === '') {
            alert('Taskname can\'t be empty !!');
            return;
        }

        let importancePriority = +importanceCheckboxRef.current.checked;
        let urgencyPriority = +urgencyCheckboxRef.current.checked;
       
        const result = {
            id,
            name,
            importancePriority,
            urgencyPriority
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
                console.log('content : ', content);
            } 
        
        submitTaskData();
        alert('Task added successfully');

        props.onCancel(); 
    }

    return(
        <Fragment>
            <form className={classes.formContainer}>
                <div className={classes.formContent}>
                    <label htmlFor="Task name">Task Name : </label>
                    <input type="text" id="name" ref={taskNameRef} required/>
                </div>
                <div>
                    <p>Please set the Task priority </p>
                </div>
                <div className={classes.priority}>
                    <label htmlFor="important">Important : </label>
                    <input type="checkbox" name="importance" value="0" ref={importanceCheckboxRef} />
                    
                </div>
                <div className={classes.priority}>
                    <label htmlFor="urgency">Urgent : </label>
                    <input type="checkbox" name="urgency" value="0" ref={urgencyCheckboxRef} />
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