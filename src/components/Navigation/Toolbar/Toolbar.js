import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToogle clicked={props.drawerToggleClicked}/>
      <Logo height='80%'/>
      <nav className={classes.DesktopOnly}>
        <NavigationItems matchPath={props.matchPath} />
      </nav>
    </header>
  );
}

export default toolbar;
