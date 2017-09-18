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


// import Sound from "react-sound";
// import make_yourself_comfortable from "../sounds/make_yourself_comfortable.mp3";
// import FireBaseTools from '../utils/firebase';


class HomeIndex extends Component {
  constructor(props) {
    super(props);

  }



  // no longer used.
  // addTask(e) {

  //   console.log('addTask(e):', this.props.currentUser.uid);

  //   //
  //   // simple firebase set (insert)
  //   //

  //   // FireBaseTools.getDatabaseReference(`users/${res.uid}/tasks`).set({
  //   //   title: this.state.taskTitle,
  //   //   user: res.email
  //   // });

  //   //
  //   // firebase push (for lists of data)
  //   //

  //   let fbRef = FireBaseTools.getDatabaseReference(`users/tasklist/${this.props.currentUser.uid}`);
  //   let childRef = fbRef.push({ 
  //     userEmail: this.props.currentUser.email,
  //     title: this.state.taskTitle
  //   });
  //   //^ you can do it in one line like above, or like this here below:

  //   // let childRef = fbRef.push();
  //   // we can get its id using key()
  //   // console.log('my new shiny id is ', childRef);
  //   // now it is appended at the end of data at the server
  //   // childRef.set({ foo: 'bar' });


  //   // console.log('E:', e.target, 'VAL:', this.state.taskTitle)
  //   // FireBaseTools.getDatabaseReference('tasks/${}').set({
  //   //   title: 'this is first task',
  //   //   user: '123'
  //   // });
  // }

  renderLoginCheck() {
    // if current user exists and user id exists than make user navigation
    if (this.props.currentUser && this.props.currentUser.uid) {
      // console.log('Home Index With User:', this.props.currentUser)
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
    

    // example of onclick history push
    //
    // <button onClick={() => {
    //     this.props.history.push('/tasks')
    // }}>push history to /tasks</button>


  // <img src="https://robohash.org/funny_slow_catapillar" />
// <div className="pt-callout pt-intent-success">
//   <h5>Callout Heading</h5>
//   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, delectus!
// </div>

// just return this component: <Sound url="/src/app/sounds/welcome_to_the_show.mp3" playStatus={Sound.status.PLAYING}/>

// let sound = new Audio(make_yourself_comfortable);
// sound.play();
// how do i render a component here in an onclick?
// <Sound url="/src/app/sounds/make_yourself_comfortable.mp3" playStatus={Sound.status.PLAYING} />;


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchUser, logoutUser }, dispatch);
// }

function mapStateToProps(mall) {
  return  { currentUser: mall.currentUser,
            userPath: mall.userPath
          };
}

export default connect(mapStateToProps, null)(HomeIndex);
