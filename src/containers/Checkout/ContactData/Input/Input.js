import React from 'react';
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let validationError = null;

  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>
  }
  switch (props.whatInput) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(res => (
            <option
              key={res.value}
              value={res.value}
            >{res.displayValue}</option>
          ))}
        </select>
      )
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />

  }
  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default Input;
