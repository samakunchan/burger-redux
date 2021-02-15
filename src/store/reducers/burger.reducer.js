import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const burgerReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [actions.ingredientName]: state.ingredients[actions.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[actions.ingredientName]
      }
    case actionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [actions.ingredientName]: state.ingredients[actions.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[actions.ingredientName]
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: actions.ingredients.salad,
          bacon: actions.ingredients.bacon,
          cheese: actions.ingredients.cheese,
          meat: actions.ingredients.meat,
        },
        totalPrice: 4,
        error: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default burgerReducer;
