import React, { Fragment } from "react";

import classes from './DoFirst.module.css'

const DoFirst = (props) => {
    return (
        <Fragment>
            <div className={classes.DoFirst}>
            <h2>Do First</h2>
                {props.data.map((elem) => {
                    return <p>{elem}</p>
                })}
            </div>
        </Fragment>
    )
}

export default DoFirst;