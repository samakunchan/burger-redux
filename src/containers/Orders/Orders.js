import React, { Component } from 'react';
import Order from "../../components/Order/Order";
import instance from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component{

  state= {
    orders: [],
    loading: true
  }
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(res => <Order
          key={res.id}
          ingredients={res.ingredients}
          price={+res.price}
        />)
    }
    return (
      <React.Fragment>
        {orders}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.ords.orders,
    loading: state.ords.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actionTypes.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance));
