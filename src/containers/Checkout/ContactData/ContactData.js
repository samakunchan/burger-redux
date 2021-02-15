import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import instance from "../../../axios-order";
import {connect} from "react-redux";
import Input from "./Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../../store/actions'
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component{
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false,
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touch: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your email '
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false,
      },
      shippingMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'regular', displayValue: 'Regular'},
            {value: 'cheapest', displayValue: 'Cheapest'},
            {value: 'fastest', displayValue: 'Fastest'},
          ]
        },
        value: 'regular',
        validation: {},
        valid: true,
        touch: false,
      },
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData =  {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.prx,
      orderData: formData
    }
    this.props.onOrderBurger(order)
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // J'ai pas eu le bug ou on ne peut pas voir ce que l'on tape.
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    // Apparemment il faut faire la même technique de clonage avec les spread si on veut avoir les "elementConfig".
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touch = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifer in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifer].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = <form onSubmit={this.orderHandler}>
      {formElementArray.map(res => <Input
        whatInput={res.config.elementType}
        key={res.id}
        elementType={res.config.elementType}
        elementConfig={res.config.elementConfig}
        value={res.value}
        invalid={!res.config.valid}
        shouldValidate={res.config.validation}
        touched={res.config.touch}
        changed={(event) => this.inputChangedHandler(event, res.id)}
      />)}
      <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
    </form>
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data.</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgs.ingredients,
    prx: state.burgs.totalPrice,
    loading: state.ords.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (datas) => dispatch(actionTypes.purchaseBurger(datas))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, instance));
