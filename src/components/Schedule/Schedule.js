import React, { Fragment } from "react";

import classes from './Schedule.module.css';

const Schedule = (props) => {
    return (
        <Fragment>
            <div className={classes.Schedule}>
                <h2>Schedule</h2>
                {props.data.map((elem) => {
                    return <p>{elem}</p>
                })}
            </div>
        </Fragment>
    )
}

export default Schedule;