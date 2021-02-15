import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from "react-router-dom";
const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.mylink}
        exact
        activeClassName={classes.active}
      >{props.children}</NavLink>
    </li>
  );
}

export default navigationItem;
