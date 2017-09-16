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
    this.startLevel2 = this.startLevel2.bind(this);
    this.startLevel3 = this.startLevel3.bind(this);
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
    // console.log('---DB Listener: 3 Tasks Complete---');
    // let fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks`);
    // // console.log('-=-=-=-=-=SUP:', fbRef);
    // fbRef.on('child_changed', snap => {
    //   console.log('FireBase Listener - TASK COMPLETE - HIT', snap.val())
    // })
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
    // console.log('start level 1 hit');

    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level/currentLevel`)
    fbRef.set('/snor/level-1');
  }
  
  startLevel2() {
    
    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level/currentLevel`)
    fbRef.set('/snor/level-1/1b');
  }

  startLevel3() {
    
    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level/currentLevel`)
    fbRef.set('/snor/level-1/1b/1c');
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


        <Route path='/snor/level2-splash' render={(props) => {
          return (
            <div>
              <h3>welcome to level 2!!!!: snor/level2-splash</h3>
              <h4>Level 2</h4>
              <p>Greetings snorling. I forgot to give you a delete button. Here you go :)</p>
              <p><em>to edit or delete, that it the question</em></p>
              <button type='button' onClick={this.startLevel2}>Let's Go!</button>
            </div>
          );
        }} />

        <Route path='/snor/level3-splash' render={(props) => {
          return (
            <div>
              <h3>welcome to level 3!!!!: snor/level3-splash</h3>
              <h4>Level 3</h4>
              <p>Hello again. Looks like you've been busy, so I was thinking...</p>
              <p>Maybe you could use a description field for your tasks</p>
              <p><em>but what am I supposed to describe?</em></p>
              <button type='button' onClick={this.startLevel3}>Let's Go!</button>
            </div>
          );
        }} />



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
