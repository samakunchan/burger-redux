import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import instance from "../../../axios-order";

class ContactData extends Component{
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props)
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      this.setState({loading: false});
    }).catch(error => {
      this.setState({loading: false});
      console.error(error)
    });
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data.</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
          <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
          <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
          <input className={classes.Input} type="text" name="zipcode" placeholder="Your zipcode"/>
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
