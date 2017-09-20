import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import FireBaseTools from '../utils/firebase';
import TasksIndex from '../components/tasks/tasks_index';
import SnorIndex from '../components/snor/snor_index';
import UserLogin from '../components/user/login';
import UserRegister from '../components/user/register';
import UserProfile from '../components/user/profile';
import ResetPassword from '../components/user/reset_password';
import requireAuth from '../utils/authenticated.js';

// TODO:
// - Need to move all firebase database references to
//   probably class level properties? just something global

class HomeIndex extends Component {
  constructor(props) {
    super(props);

  }

  // shouldComponentUpdate(nextProps, nextState) {

    // console.log('$$$$$$$$$$$$$$$$$$$$$$')

    // console.log('CURR PROPS: ', this.props)
    // console.log('NEXT PROPS: ', nextProps)
    // console.log('CURR STATE: ', this.state)
    // console.log('NEXT STATE: ', nextState)

    // if (this.props.currentUser && (JSON.stringify(this.props.currentUser) !== JSON.stringify(this.nextProps.currentUser))) {
    //   return true;
    // }
    // // debugger;
    // if (this.props.userPath && Object.keys(this.props.userPath) > 0 && (JSON.stringify(this.props.userPath) !== JSON.stringify(this.nextProps.userPath))) {
    //   return true;
    // }

    // return false;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('HOME INDEX UPDATED!')
  // }


  renderLoginCheck() {
    // if current user exists and user id exists than make user navigation
    if (this.props.currentUser && this.props.currentUser.uid) {
      return (
        <div>
          { this.props.currentUser.displayName
            ? <p className='ubuntu-gray-medium'>
                Hello,
                { this.props.currentUser.displayName
                ? this.props.currentUser.displayName
                : 'snorLing'}
                { this.props.userPath.avatarName &&
                  <span>. I am {this.props.userPath.avatarName}, I'll be your assistant</span>
                }
              </p>
            : <div className="card-skinny">
                <span className="card-skinny-span">
                  Hey snorLing, did you know you can change you name in your profile?
                </span>
                <button className="card-skinny-btn" onClick={() => {
                  this.props.history.push('/profile');
                  }}>
                  TAKE ME
                </button>
              </div>
          }

          <Route exact path='/' render={(props) => {
            return (
              <div className="card-skinny">
                <span className="card-skinny-span medium-text">
                  Hey, how'd you get here? jk, there might be some neato stuff
                  here in the future. But for now, click the button to continue
                </span>
                <button className="card-skinny-btn" onClick={() => {
                    let fbRefLevel = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

                    fbRefLevel.once('value', snap => {
                      this.props.history.push(snap.val().currentLevel);
                    })
                  }}>
                  Continue
                </button>
              </div>
            );
          }} />

        <Route path="/snor" component={SnorIndex} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/profile" component={UserProfile} onEnter={requireAuth} />

        </div>
      );
    }
    else {
      return (
        <div>
          <Route exact path="/" render={(props) => {
            return (
              <div>

                <p className='nova-gray-medbig'>:unknown snorLing detected:</p>
                
                <p className="card-primary">
                  The snorLab would like to keep track of you...err...I mean <em>your</em> progress.
                  For this, we require you to login/register before continuing your journey :)
                </p>

              </div>
            );
          }} />
          <Route path="/login" component={UserLogin} />
          <Route path="/register" component={UserRegister} />
          
        </div>
      );
    }
  }

  render() {

      return (
        <div>
          {this.renderLoginCheck() }
        </div>
      );
        
      } // end render
    } // end class
    
function mapStateToProps(mall) {
  return  { currentUser: mall.currentUser,
            userPath: mall.userPath
          };
}

export default connect(mapStateToProps, null)(HomeIndex);
