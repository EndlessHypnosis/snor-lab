import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, logoutUser } from "../actions/firebase_actions";
import music_14 from "../sounds/music_14.mp3";
import make_yourself_comfortable from "../sounds/make_yourself_comfortable.mp3";


// TODO:
// when changing display name in profile,
// it doesn't update till you get back to root

class App extends Component {
  constructor(props) {
    super(props);

    this.props.fetchUser();
    this.logOut = this.logOut.bind(this);

    this.runLoop();
  }

  runLoop() {
    console.log('RUN LOOP WAS STARTED');
      (function loop() {
        var now = new Date();
        console.log('DATE: ', now.getDate(), ' | TIME: ', now.getHours(), ':', now.getMinutes())
        if (now.getDate() === 11 && now.getHours() === 16 && now.getMinutes() === 52) {
          // check for notifications here. This is essentially our cron.
          console.log('RUN LOOP WAS TIME WAS TRIGGERED!!!')
        }
        now = new Date();                  // allow for time passing
        var delay = 60000 - (now % 60000); // exact ms to next minute interval
        setTimeout(loop, delay);
      })();
  }

  componentDidMount() {
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
      console.log("logout log:", data);
      this.props.fetchUser();
    });
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
              <li>
                <Link to="/snor">continue my journey</Link>
              </li>
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

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
