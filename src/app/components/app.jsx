import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, logoutUser } from "../actions/firebase_actions";
import music_14 from "../sounds/music_14.mp3";
import make_yourself_comfortable from "../sounds/make_yourself_comfortable.mp3";
import FireBaseTools from '../utils/firebase';

import Notifications, { success } from 'react-notification-system-redux';


const notificationStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      margin: '10px 5px 2px 1px',
      borderRadius: '12px',
      fontSize: '18px',
    },

    success: { // Applied only to the success notification item
      color: '#000000',
      fontSize: '20px',
      backgroundColor: '#ffffff',
      borderTop: '4px solid darkgray',
      borderBottom: '4px solid darkgray'
    }
  },
  Title: {
    DefaultStyle: {
      fontSize: '18px',
      margin: '10px',
      padding: 0,
      fontWeight: 'bold'
    },

    success: {
      color: '#000000'
    }
  },
  Action: {
    DefaultStyle: {
      background: '#ffffff',
      borderRadius: '3px',
      fontSize: '16px',
      padding: '8px 20px',
      fontWeight: 'bold',
      margin: '10px',
      border: 0
    },

    success: {
      backgroundColor: '#c74148',
      color: '#ffffff',
      cursor: 'pointer'
    }
  }
}



// TODO:
// when changing display name in profile,
// it doesn't update till you get back to root

class App extends Component {
  constructor(props) {
    super(props);

    this.props.fetchUser();

    this.fbRefCurrentLevel = undefined;
    this.runLoop = this.runLoop.bind(this);

  }

  runLoop() {
    // console.log('RUN LOOP LOGGER');

        var now = new Date();
        // make sure user exists
        if (this.props.currentUser && this.props.currentUser.uid) {


          let fbLocalRefReminders = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-reminders`)
            .orderByKey();

          fbLocalRefReminders.once('value')
            .then(snap => {
              snap.forEach(childSnap => {
                let key = childSnap.key;
                let childData = childSnap.val();

                console.log(  'Checking key:', key,
                              ':with hour:', childData.hour,
                              ':with minute:', childData.minute);
                console.log('Actual Time:', now.getHours(), ':', now.getMinutes());


                if  ( ( (childData.hour == now.getHours() && childData.minute <= now.getMinutes())
                        ||
                        (childData.hour < now.getHours())
                      ) && childData.status === 'new'
                    ) {
                  console.log('+++++RUN LOOP REMINDER TRIGGERED++++++:KEY:', key, ':TITLE:', childData.title)


                  const notificationOpts = {
                    title: childData.title,
                    position: 'tl',
                    autoDismiss: 45
                  };

                  this.props.success(notificationOpts);

                }


              })
            })
          
          
        }

        now = new Date();                  // allow for time passing
        var delay = 60000 - (now % 60000); // exact ms to next minute interval
        setTimeout(this.runLoop, delay);
  }

  componentDidMount() {
    this.runLoop();
  }


  renderUserMenu() {
    // if current user exists and user id exists than make user navigation
    if (this.props.currentUser && this.props.currentUser.uid) {
      return (
        <div className='flex-column'>

          

          <button className='btn-primary bot-padding' onClick={() => {
            this.props.history.push('/profile');
          }}>Profile</button>

          <button className='btn-primary' onClick={() => {
            this.props.logoutUser().then(data => {
              this.props.fetchUser().then(data => {
                this.props.history.push('/logout');
              })
            });
          }}>Logout</button>

        </div>
      );
    } else {
      return (
        <div className='flex-column'>

          <button className='btn-primary bot-padding' onClick={() => {
            this.props.history.push('/login');
          }}>Login</button>

          <button className='btn-primary' onClick={() => {
            this.props.history.push('/register');
          }}>Register</button>
          
        </div>
      );
    }
  }

  render() {
    return (
      <div className='sidebar-wrapper'>
        
        <button className='btn-primary btn-mega bot-padding' onClick={() => {
          this.props.history.push('/');
        }}>Home</button>

        {this.renderUserMenu()}
        <Notifications notifications={this.props.notifications}
          style={notificationStyle}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, logoutUser, success }, dispatch);
}

function mapStateToProps(mall) {
  return  { currentUser: mall.currentUser,
            notifications: mall.notifications
          };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
