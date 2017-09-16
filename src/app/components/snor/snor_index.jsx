import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FireBaseTools from '../../utils/firebase';
import { Route } from 'react-router';
import TasksIndex from '../tasks/tasks_index';
import { setPathLevel } from '../../actions/index';
import { bindActionCreators } from "redux";


class SnorIndex extends Component {
  constructor(props){
    super(props);

    this.state={
      none: 'none'
    };

    // setup this ref globbaly so i can turn off the listener
    // in the component did unmount or something like that
    this.fbRefCurrentLevel = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

    this.startLevel1 = this.startLevel1.bind(this);
  }
  
  componentDidMount(){

    this.initFireBaseListeners();

  }

  whereDoYouBelong(currentLevel = 'invalid') {

    if (currentLevel !== 'invalid') {
      // console.log('SNOR INDEX:', this.props)
      this.props.history.push(currentLevel);
    }

    // switch (currentLevel) {
    //   case 'welcome-splash':
    //     this.props.history.push('/snor/welcome-splash');
    //   default:
    //     console.log('---UNKNOWN level/currentLevel VALUE---')
    // }
  }

  initFireBaseListeners() {
    console.log('---Setting up FireBase DB Listener---');
    
    // as global now
    // const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);
    
    console.log('---DB Listener: Updating path level---');
    this.fbRefCurrentLevel.on('value', snap => {
      console.log('FireBase Listener - LEVEL - HIT:', snap.val());

      // update userPath store
      this.props.setPathLevel(snap.val().currentLevel);
      // actually do redirect
      this.whereDoYouBelong(snap.val().currentLevel);
    })

    /////////////////////////////////////////////
    console.log('---DB Listener: 3 Tasks Complete---');
    let fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks`);
    console.log('-=-=-=-=-=SUP:', fbRef);
    fbRef.orderByChild('/status').equalTo('complete')
      .on('child_changed', snap => {
        console.log('FireBase Listener - TASK COMPLETE - HIT', snap.val())
      })

  }

  // componentWillUpdate(nextProps, nextState) {
  //   const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);
  //   fbRef.once('value', snap => {
  //     console.log('COMPONENT WILL UPDATE _ SNOR INDEX');
  //     this.whereDoYouBelong(snap.val().currentLevel);
  //   })    
  // }

  // somehwere here in snor index, we could call a function,
  // or better yet have a listener to the database, and when
  // it detects a level upgrade, force the user to a new route :)

  startLevel1() {
    console.log('start level 1 hit');

    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level/currentLevel`)
    fbRef.set('/snor/level-1');
  }
  
  render() {
    return(
      <div>
        <h2>This is the SNOR INDEX</h2>
        <Route path='/snor/welcome-splash' render={(props) => {
          return (
            <div>
              <h3>this is the starting point: snor/welcome-splash</h3>
              <h4>Level 1</h4>
              <p>Greetings snorling. You're ready to embark on your journey of productivity.</p>
              <p>In level 1, you're only allowed to enter simple tasks</p>
              <p><em>i wonder how many levels there are...</em></p>
              <button type='button' onClick={this.startLevel1}>Let's Go!</button>
            </div>
          );
        }} />

        <Route path="/snor/level-1" component={TasksIndex} />

        </div>
      );
    }
  }
  

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setPathLevel }, dispatch);
}

function mapStateToProps(mall) {
  return { 
    currentUser: mall.currentUser,
    userPath: mall.userPath
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnorIndex);
