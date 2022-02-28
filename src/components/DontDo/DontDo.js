import React, { Fragment } from "react";

import classes from './DontDo.module.css';

const DontDo = (props) => {
    return (
        <Fragment>
            <div className={classes.DontDo}>
                <h2>Don't do</h2>
                {props.data.map((elem) => {
                    return <p>{elem}</p>
                })}
            </div>
        </Fragment>
    )
}

export default DontDo;