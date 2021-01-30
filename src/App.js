import classes from './App.module.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder";
// import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
      <div className={classes.App}>
        <Layout>
          {/*<BurgerBuilder />*/}
          <Switch>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/checkout' component={Checkout}/>
          </Switch>
        </Layout>
      </div>
  );
}

export default App;
