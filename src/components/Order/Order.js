import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
  // Pour créé un array avec des objects, on peut utilisé la logique qui se trouve dans Burger.js ligne 8. Ici on fait une autre méthode.
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
  }
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients.map(res => <span
        style={{textTransform: 'capitalize',  display: "inline-block", margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
        key={res.name}>
        <em>{res.name} ({res.amount}) </em>
      </span>)}
      </p>
      <p>Price: <strong>{props.price.toFixed(2)} EUR</strong></p>
    </div>
  );
}

export default Order;
