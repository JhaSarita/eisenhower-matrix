import React, { Fragment } from "react";

import classes from './Delegate.module.css';

const Delegate = (props) => {
    return (
        <Fragment>
            <div className={classes.Delegate}>
                <h2>Delegate</h2>
                {props.data.map((elements, index) => {
                    return <p key={index}>{elements}</p>
                })}
            </div>
        </Fragment>
    )
}

export default Delegate;