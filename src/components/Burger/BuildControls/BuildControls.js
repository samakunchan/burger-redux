import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
    return (
      <div className={classes.BuildControls}>
          <p>Current Price <strong>{props.price.toFixed(2)} euros.</strong></p>
          {controls.map(res => <BuildControl
            key={res.label}
            label={res.label}
            added={() => props.ingredientAdded(res.type)}
            removed={() => props.ingredientRemoved(res.type)}
            disabled={props.disabled[res.type]}
          />)}
        <button
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}
        >ORDER NOW
        </button>
      </div>
    )
}

export default buildControls;
