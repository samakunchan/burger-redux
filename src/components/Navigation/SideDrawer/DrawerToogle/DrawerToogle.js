import React from 'react';
import classes from './DrawerToogle.module.css';

const drawerToogle = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default drawerToogle;
