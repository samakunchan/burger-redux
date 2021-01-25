import React from 'react';
import Aux from "../../../hoc/Auxi/Auxi";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(res => {
    return <li key={res}><span style={{textTransform: 'capitalize'}}>{res}</span>: {props.ingredients[res]}</li>;
  })
  return (
  <Aux>
    <h3>Your order.</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      {ingredientSummary}
    </ul>
    <p><strong>Total price: {props.totalPrice} euros.</strong></p>
    <p>Continue to checkout?</p>
    <Button btnType='Danger' clicked={props.purchaseCancel} >Cancel</Button>
    <Button btnType='Success' clicked={props.purchaseContinue} >Continue</Button>
  </Aux>
  );
}

export default orderSummary;
