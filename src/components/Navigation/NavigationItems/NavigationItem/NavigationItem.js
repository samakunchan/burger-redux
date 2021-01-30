import React from 'react';
import classes from './NavigationItem.module.css';
const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <a href={props.mylink} className={props.active ? props.active : null }>{props.children}</a>
    </li>
  );
}

export default navigationItem;
