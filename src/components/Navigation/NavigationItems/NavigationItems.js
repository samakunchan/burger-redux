import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem mylink='/' matchPath={props.matchPath}>BurgerBuilder</NavigationItem>
      <NavigationItem mylink='/orders' matchPath={props.matchPath}>Orders</NavigationItem>
    </ul>
  );
}

export default navigationItems;
