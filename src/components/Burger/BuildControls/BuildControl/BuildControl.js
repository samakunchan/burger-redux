import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
      <div className={classes.BuildControl}>
        <div >{props.label}</div>
        <button onClick={props.removed} disabled={props.disabled}>-</button>
        <button onClick={props.added}>+</button>
      </div>
    );
}

export default buildControl;
