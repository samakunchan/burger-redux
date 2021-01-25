import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxi/Auxi';

const sideDrawer = (props) => {
  let attachedClassed = [ classes.SideDrawer, classes.Close ];
  if (props.isOpen) {
    attachedClassed = [ classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.isOpen} clicked={props.closed}/>
      <div className={attachedClassed.join(' ')}>
        <Logo height='50px'/>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;
