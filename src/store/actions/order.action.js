import * as actionTypes from './actionTypes';
import instance from "../../axios-order";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    datas: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const purchaseBurger = (order) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    instance.post('/orders.json', order).then(res => {
      dispatch(purchaseBurgerSuccess(res.data.name, order))
    }).catch(error => {
      dispatch(purchaseBurgerFail(error))
      console.error(error)
    });
  }
}


export const fecthOrdersSuccess = orders => {
  return {
    type: actionTypes.FECTH_ORDER_SUSSESS,
    orders: orders
  }
}
export const fecthOrdersFail = error => {
  return {
    type: actionTypes.FECTH_ORDER_FAIL,
    error: error
  }
}
export const fecthOrdersStart = () => {
  return {
    type: actionTypes.FECTH_ORDER_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fecthOrdersStart());
    instance.get('/orders.json').then(res => {
      let fetchedOrders = []
      for (let key in res.data) {
        fetchedOrders.push({...res.data[key], id: key})
      }
      dispatch(fecthOrdersSuccess(fetchedOrders))
    }).catch(error => {
      dispatch(fecthOrdersFail(error))
    })
  }
}
