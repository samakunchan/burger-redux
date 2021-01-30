import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem mylink='/'>BurgerBuilder</NavigationItem>
      <NavigationItem mylink='/checkout'>Checkout</NavigationItem>
    </ul>
  );
}

export default navigationItems;
