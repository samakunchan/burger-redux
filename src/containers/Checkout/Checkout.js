import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'


class Checkout extends Component{

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      console.log(this.props.purchased)
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" />: null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancel={this.checkoutCancelHandler}
            onCheckoutContinue={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      )
    }
    return (
      <div>
        {summary}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgs.ingredients,
    purchased: state.ords.purchased
    // prx: state.burgs.totalPrice // On a plus besoin du render ligne 29, donc plus besoin de prx
  }
}

export default connect(mapStateToProps)(Checkout);
