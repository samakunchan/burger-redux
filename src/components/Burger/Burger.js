import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.css';

const burger = (props) => {

    let receivedIngredients = Object.keys(props.ingredients).map(res => {
        return [...Array(props.ingredients[res])].map((_, index) => {
            return <BurgerIngredient key={res + index} type={res} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (receivedIngredients.length <= 0) {
        receivedIngredients = <p>Please start add ingredients</p>
    }
    // console.log(receivedIngredients);
    return (
      <div className={classes.Burger}>
        <BurgerIngredient type={'bread-top'} />
        {receivedIngredients}
        <BurgerIngredient type={'bread-bottom'} />
      </div>
    );
}

export default burger;
