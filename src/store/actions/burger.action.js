import * as actionTypes from './actionTypes';
import instance from "../../axios-order";

export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: type
  }
}

export const deleteIngredient = (type) => {
  return {
    type: actionTypes.DELETE_INGREDIENT,
    ingredientName: type
  }
}
export const setIngredients = (ing) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ing
  }
}
export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL,
  }
}
export const initIngredients = () => {
  return dispatch => {
    instance.get( '/ingredients.json' )
      .then( response => {
        dispatch(setIngredients(response.data))
      } )
      .catch( error => {
        dispatch(fetchIngredientsFail())
      } );
  }
}
