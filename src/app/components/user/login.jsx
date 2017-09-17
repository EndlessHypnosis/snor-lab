import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, fetchUser, loginWithProvider } from '../../actions/firebase_actions';


class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.loginWithProvider = this.loginWithProvider.bind(this);
        this.state = {
            message: '',
        };
    }

    // login form submit
    onFormSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;
        // console.log('FIRST CONSOLE LOG: ', this)
        this.props.firebaseLoginUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                // where do you want to push on successful login?
                this.props.history.push('/snor')
            }
        }
        );
    }

    // not sure i need this anymore
    loginWithProvider(provider) {
        console.log('---YOU ARE TRYING TO LOG IN WITH A PROVIDER---')
        this.props.loginWithProvider(provider).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                this.props.history.push('/profile');
            }
        });
    }

    render() {
        return (
            <div>
            <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
                { this.state.message !== '' &&
                    <p className='card-error'>
                    {this.state.message}
                    </p>
                }
                <p className='nova-gray-medbig'>Login</p>

                <label htmlFor="txtEmail" className='ubuntu-gray-medium'>
                    Email Address:
                </label>
                <input
                    type="email" className="input-primary"
                    id="txtEmail" ref="email"
                    placeholder="Enter Email" name="email"
                />

                <label htmlFor="txtPass" className='ubuntu-gray-medium'>
                    Password:
                </label>
                <input
                    type="password" className="input-primary"
                    id="txtPass" ref="password"
                    placeholder="Password" name="password"
                />

                <button type="submit" className="btn-primary btn-mega">Login</button>
                </form>
                </div>
                
            );
        }
        
    }

    // This could be setup, but don't know if the email system is working
    // <h5><Link to="/reset">Forgot password?</Link></h5>



// <h4>Login with</h4>
//     <a
//         href="#" className="btn btn-block btn-social btn-facebook" onClick={() => {
//             this.loginWithProvider('facebook');
//         }} data-provider="facebook"
//     >Facebook</a>

//     <a
//         href="#" className="btn btn-block btn-social btn-twitter" onClick={() => {
//             this.loginWithProvider('twitter');
//         }} data-provider="twitter"
//     >Twitter</a>

//     <a
//         href="#" className="btn btn-block btn-social btn-google" onClick={() => {
//             this.loginWithProvider('google');
//         }} data-provider="twitter"
//     >Google</a>

//     <a
//         href="#" className="btn btn-block btn-social btn-github" onClick={() => {
//             this.loginWithProvider('github');
//         }} data-provider="twitter"
//     >Github</a>


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        firebaseLoginUser: loginUser,
        fetchUser,
        loginWithProvider,
    }, dispatch);
}

// OR


// function mapDispatchToProps(dispatch) {
//     return {
//         loginUser: (data) => {
//             dispatch(loginUser(data))
//         },
//         fetchUser: (data) => {
//             dispatch(fetchUser(data))
//         }, loginWithProvider: (data) => {
//             dispatch(loginWithProvider(data))
//         }
//     };
// }


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
