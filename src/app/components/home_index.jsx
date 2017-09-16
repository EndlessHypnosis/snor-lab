import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import TasksIndex from '../components/tasks/tasks_index';
import SnorIndex from '../components/snor/snor_index';

import UserLogin from '../components/user/login';
import UserRegister from '../components/user/register';
import UserProfile from '../components/user/profile';
import ResetPassword from '../components/user/reset_password';
import requireAuth from '../utils/authenticated.js';


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

  renderLoginCheck(currentUser) {
    // if current user exists and user id exists than make user navigation
    if (currentUser && currentUser.uid) {
      // console.log('Home Index With User:', currentUser)
      return (
        <div>
          {currentUser.displayName
            ? `Good day, ${currentUser.displayName}`
            : `psst head over to your profile and fill out your name`
          }
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
                <h4>No User Logged In</h4>
                <p>The snorLab would like to keep track of you...I mean your progress.</p>
                <p>For this, we require you to login/register before continuing your journey :)</p>
                <Link to='/login'>click here to login</Link>
                <Link to='/register'>click here to register</Link>
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
          <h3>Welcome to the snorLab</h3>
          <p>this is a sub message</p>
          {this.renderLoginCheck(this.props.currentUser) }
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
  return { currentUser: mall.currentUser };
}

export default connect(mapStateToProps, null)(HomeIndex);
