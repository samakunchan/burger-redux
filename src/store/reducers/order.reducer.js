import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const orderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...actions.datas,
        id: actions.id
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.FECTH_ORDER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FECTH_ORDER_SUSSESS:
      return {
        ...state,
        orders: actions.orders,
        loading: false
      }
    case actionTypes.FECTH_ORDER_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default orderReducer;
