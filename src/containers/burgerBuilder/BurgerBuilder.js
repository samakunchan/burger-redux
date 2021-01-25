import React, {Component} from 'react';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import instance from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 1,
  meat: 3,
  bacon: 2,
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    instance.get('/ingredients.json').then(res => {
      this.setState({ingredients: res.data})
    }).catch(error => {
      this.setState({error: true})
    })
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert('continue?');
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Cédric Badjah',
        address: {
          street: '537 rue du pré aux clercs',
          zipcode: 34090,
          country: 'France'
        },
        email: 'samakunchan@gmail.com'
      },
      shippingMethod: 'fastest'
    }
    instance.post('/orders.json', order).then(res => {
      console.log(res);
      this.setState({loading: false, purchasing: false})
    }).catch(error => {
      this.setState({loading: false, purchasing: false});
      console.error(error)
    });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(res => {
      return ingredients[res];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchasable : sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {...this.state.ingredients}
    updatedIngredient[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ingredients: updatedIngredient, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredient);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredient = {...this.state.ingredients}
    updatedIngredient[type] = updatedCount;

    const priceReduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;

    this.setState({ingredients: updatedIngredient, totalPrice: newPrice});
    this.updatePurchaseState(updatedIngredient);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // le disabledInfo va donnée le resultat ci-dessous.
    // { salad: true, meat: false, ... }
    let orderSummary = null

    let burger = this.state.error ? <p>Error loading initial ingredients.</p>: <Spinner />
    if (this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice}
      />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
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

export default WithErrorHandler(BurgerBuilder, instance);
