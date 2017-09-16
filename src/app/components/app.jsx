import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, logoutUser } from "../actions/firebase_actions";
import music_14 from "../sounds/music_14.mp3";
import make_yourself_comfortable from "../sounds/make_yourself_comfortable.mp3";
import FireBaseTools from '../utils/firebase';


// TODO:
// when changing display name in profile,
// it doesn't update till you get back to root

class App extends Component {
  constructor(props) {
    super(props);

    this.props.fetchUser();
    this.logOut = this.logOut.bind(this);

    // this is a keeper...needed for reminders
    // this.runLoop();

    this.fbRefCurrentLevel = undefined;
    this.runLoop = this.runLoop.bind(this);
    
    
    // FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

    // console.log('WHAT IS this.fbRefCurrentLevel:', this.fbRefCurrentLevel)

  }

  runLoop() {
    console.log('RUN LOOP LOGGER');

      // (function loop() {
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

                  // // award an avatar token - put this in the callback of
                  // // completing a reminder! in the notification
                  // let fbRefPoints = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);
                  // fbRefPoints.child('points').once('value', snap => {

                  //   let changer = 1;

                  //   let newPointVal = parseInt(snap.val()) + changer;
                  //   snap.ref.set(newPointVal);
                  // })


                }


                // if (childData.hour <= now.getHours() && childData.minute <= now.getMinutes()) {
                //   console.log('+++++RUN LOOP REMINDER TRIGGERED++++++:KEY:', key, ':TITLE:', childData.title)

                //   // show notification here with callback button to delete the reminder or snooze for 2/5/10/15/30/45/60 mins

                // }
              })
            })
          
          
        }

        // console.log('DATE: ', now.getDate(), ' | TIME: ', now.getHours(), ':', now.getMinutes())
        // if (now.getDate() === 11 && now.getHours() === 16 && now.getMinutes() === 52) {
        //   // check for notifications here. This is essentially our cron.
        //   // console.log('RUN LOOP WAS TIME WAS TRIGGERED!!!')
        // }
        now = new Date();                  // allow for time passing
        var delay = 60000 - (now % 60000); // exact ms to next minute interval
        setTimeout(this.runLoop, delay);
        // })();
  }

  componentDidMount() {

    this.runLoop();
    // let sound = new Audio(music_14);
    // sound.play();

    // sound = new Audio(make_yourself_comfortable);

    // setTimeout(() => {
    //   sound.play();
    // }, 7000);

  }

  logOut() {
    this.props.logoutUser().then(data => {
      // reload props from reducer
      // console.log("logout log:", data);
      this.props.fetchUser();
    });
  }

  renderContinueMenu(currentUser) {
    if (currentUser && currentUser.uid) {
      return (
        <li>
          <button onClick={() => {
            this.fbRefCurrentLevel = FireBaseTools.getDatabaseReference(`users/${currentUser.uid}/account/level`);

            this.fbRefCurrentLevel.once('value', snap => {
              // console.log('Continue My Journey WHERE:', snap.val());
              this.props.history.push(snap.val().currentLevel);
            })
          }}>continue my journey</button>
        </li>
      );
    }
  }

  renderUserMenu(currentUser) {
    // if current user exists and user id exists than make user navigation
    if (currentUser && currentUser.uid) {
      return (
        <li className="dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {currentUser.email} <span className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/profile">profile</Link>
            </li>
            <li role="separator" className="divider" />
            <li>
              <Link to="/logout" onClick={this.logOut}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      );
    } else {
      return [
        <li key={1}>
          <Link to="/login">Login</Link>
        </li>,
        <li key={2}>
          <Link to="/register">Register</Link>
        </li>
      ];
    }
  }

  render() {
    // using JSX:
    // const mySpinner = <Spinner intent={Intent.PRIMARY} />;

    // using the namespace import:
    // const anotherSpinner = (
    //   <Blueprint.Spinner intent={Blueprint.Intent.PRIMARY} />
    // );

    // use factories for React.createElement shorthand if you're not using JSX.
    // every component provides a corresponding <Name>Factory.
    // const myDatePicker = DatePickerFactory();

    return (
      <div>
        <header
          className="navbar navbar-static-top"
          id="top"
          role="banner"
        >
          <div className="navbar-header">
            <button
              className="navbar-toggle collapsed"
              type="button"
              data-toggle="collapse"
              data-target=".bs-navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">
              snorLab
            </Link>
          </div>
          <nav
            className="collapse navbar-collapse bs-navbar-collapse"
            role="navigation"
          >
            <ul className="nav navbar-nav">
              {this.renderContinueMenu(this.props.currentUser)}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.renderUserMenu(this.props.currentUser)}
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}
// in classname container
// {this.props.children}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, logoutUser }, dispatch);
}

function mapStateToProps(mall) {
  return { currentUser: mall.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
