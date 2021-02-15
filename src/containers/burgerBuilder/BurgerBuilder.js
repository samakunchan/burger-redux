import React, { Component } from 'react';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import instance from '../../axios-order';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index'; // /index est facultatif

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseState ( ingredients ) {
    const sum = Object.keys( ingredients )
      .map( igKey => {
        return ingredients[igKey];
      } )
      .reduce( ( sum, el ) => {
        return sum + el;
      }, 0 );
    return sum > 0;
  }


  purchaseHandler = () => {
    this.setState( { purchasing: true } );
  }

  purchaseCancelHandler = () => {
    this.setState( { purchasing: false } );
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if ( this.props.ings ) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onDeleteIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.prx} />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.prx}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler} />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgs.ingredients,
    prx: state.burgs.totalPrice,
    error: state.burgs.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (type) => dispatch(actionTypes.addIngredient(type)),
    onDeleteIngredient: (type) => dispatch(actionTypes.deleteIngredient(type)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients()),
    onInitPurchase: () => dispatch(actionTypes.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder , instance));

