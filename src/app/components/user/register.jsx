import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../../actions/firebase_actions';
import FireBaseTools from '../../utils/firebase';

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            message: '',
        };
    }

    initializeUserInDataBase(data) {
        console.log('REGISTER USER DATA:', data);

        const fbRef = FireBaseTools.getDatabaseReference(`users/${data.payload.uid}/account/level`)
        fbRef.set({
            email: data.payload.email,
            currentLevel: '/snor/welcome-splash',
            points: 0,
            avatarUrl: '',
            avatarName: '',
            avatarTokens: 2
        }).then(any => {
            this.props.history.push('/snor/welcome-splash');
        })
    }

    onFormSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;
        this.props.registerUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage })
                    ;
            } else {
                // TODO: Dont think we can use browserHistory here
                // look into how we did it in movie tracker
                // browserHistory.push('/profile');
                this.initializeUserInDataBase(data);
                // this.props.history.push('/profile');
            }
        }
        );
    }

    render() {
        return (
            <div>
                <form id="frmRegister" role="form" onSubmit={this.onFormSubmit}>
                    {this.state.message !== '' &&
                        <p className='card-error'>
                            {this.state.message}
                        </p>
                    }
                    
                    <p className='nova-gray-medbig'>Register</p>
                    
                    <label htmlFor="txtRegEmail" className='ubuntu-gray-medium'>
                        Email Address:
                    </label>
                    <input
                        type="email" className="input-primary"
                        ref="email" id="txtEmail"
                        placeholder="Enter Email" name="email"
                    />

                    <label htmlFor="txtRegPass" className='ubuntu-gray-medium'>
                        Password:
                    </label>
                    <input
                        type="password" className="input-primary"
                        ref="password" id="txtPass"
                        placeholder="Password" name="password"
                    />
                    
                    <button type="submit" className="btn-primary btn-mega">Register</button>
                    

                </form>
            </div>
        );
    }

}

// <br /> <br />

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
        registerUser,
    }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
