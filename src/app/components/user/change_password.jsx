import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../actions/firebase_actions';

class ChangePassword extends Component {

  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.state = {
        message: '',
    };
  }

  onFormSubmit(event) {
      event.preventDefault();
      let password = this.refs.password.value;
      let repeatPassword = this.refs.repeatPassword.value;
      if (password !== repeatPassword) {
        this.setState({
          message: 'Please password must match!',
      });
    } else {
        this.props.changePassword(password).then((data) => {
          if (data.payload.errorCode)
            this.setState({ message: data.payload.errorMessage });
          else
          this.setState({ message: 'Password was changed!' });
      });
    }
  }

    render() {
      return (
      <form id="ChangePassword" role="form" onSubmit={this.onFormSubmit}>
        <div className='card-primary'>
          {this.state.message !== '' &&
            <p className='card-error'>
              {this.state.message}
            </p>
          }
          <p className='nova-gray-medium'>Change Password</p>
          
          <label htmlFor="password" className='ubuntu-gray-medium'> New Password: </label>
          <input type="password" className="input-primary"
            name="password" ref="password" id="password" 
          />

          <label htmlFor="repeatPassword" className='ubuntu-gray-medium'> Repeat Password: </label>
          <input type="password" className="input-primary"
            name="repeatPassword" ref="repeatPassword" id="repeatPassword" 
          />

          <button type="submit" className="btn-primary btn-mega">Change Password</button>
        </div>
      </form>
    );
  }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changePassword }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
