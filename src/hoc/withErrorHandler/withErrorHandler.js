import React, {Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Auxi/Auxi';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // On est censé utilisé le constructor à la place du componentwillmount, mais il y a une érreur à gérer.
    // Can't call setState on a component that is not yet mounted.
    // This is a no-op, but it might indicate a bug in your application.
    // Instead, assign to `this.state` directly or define a `state = {};`
    // class property with the desired state in the _temp component
    // constructor(props) {
    //   super(props);
    //   axios.interceptors.request.use(req => {
    //     this.setState({error: null});
    //     return req;
    //   });
    //   axios.interceptors.response.use(res => res, error => {
    //     this.setState({error: error});
    //   });
    // }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
