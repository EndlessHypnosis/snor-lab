import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FireBaseTools from '../../utils/firebase';
import { Route, Switch } from 'react-router';
import TasksIndex from '../tasks/tasks_index';
import RemindersIndex from '../reminders/reminders_index';
import AvatarOutput from './avatar_output';
import { setPathLevel, setAvatarUrl, setAvatarName, setAvatarTokens } from '../../actions/index';
import { bindActionCreators } from "redux";


class SnorIndex extends Component {
  constructor(props){
    super(props);

    this.state={
      taskOrReminder: 'task'
    };

    // setup this ref globbaly so i can turn off the listener
    // in the component did unmount or something like that
    this.fbRefCurrentLevel = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

    this.toggleTaskReminder = this.toggleTaskReminder.bind(this);
    this.startLevel1 = this.startLevel1.bind(this);
    this.startLevel2 = this.startLevel2.bind(this);
    this.startLevel3 = this.startLevel3.bind(this);
    this.startLevel4 = this.startLevel4.bind(this);
    this.startLevel5 = this.startLevel5.bind(this);

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
    this.fbRefCurrentLevel.child('currentLevel').off();
    this.fbRefCurrentLevel.child('currentLevel').on('value', snap => {
      console.log('FireBase Listener - LEVEL - HIT:', snap.val());

      // update userPath store
      this.props.setPathLevel(snap.val());
      // actually do redirect
      this.whereDoYouBelong(snap.val());
    })

    // TODO: THese could be all grouped into 1 action i think
    // where we pass in the entire new object, and then
    // keep doing the object.assign.
    this.fbRefCurrentLevel.child('avatarUrl').off();
    this.fbRefCurrentLevel.child('avatarUrl').on('value', snap => {
      this.props.setAvatarUrl(snap.val());
    })

    this.fbRefCurrentLevel.child('avatarName').off();
    this.fbRefCurrentLevel.child('avatarName').on('value', snap => {
      this.props.setAvatarName(snap.val());
    })

    this.fbRefCurrentLevel.child('avatarTokens').off();
    this.fbRefCurrentLevel.child('avatarTokens').on('value', snap => {
      this.props.setAvatarTokens(snap.val());
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

  startLevel4() {
    
    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level/currentLevel`)
    fbRef.set('/snor/level-1/1b/1c/1d');
  }

  startLevel5() {
    
    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level/currentLevel`)
    fbRef.set('/snor/level-1/1b/1c/1d/1e');
  }




  // splashLevel4() {
  //   console.log('#######SPLASH lvel 4');
  //   if (this.props.history.location.pathname === '/snor/level4-splash') {
  //     console.log('++++++SPLASH lvel 4');

  //     // FireBaseTools.getStorageReference()
  //     // .child(`snor/assets/user/avatar/${this.props.currentUser.uid}.png`)
  //     // .getDownloadURL()
  //     // .then(url => {
  //     //   console.log('******URL:', url)
  //     // })

  //     // this.addImageToStorage(this.props.currentUser.uid, 'user/avatar', `https://robohash.org/${this.props.currentUser.uid}`);


  //   }


  //   return {
  //     name: '::invalid::'
  //   }

  // }



  // addImageToStorage(key, folderPath, imgUrl) {
  //   // just playing around with storage here
  //   //

  //   let prePath = 'snor/assets/';

  //   let folderImages = FireBaseTools.getStorageReference().child(prePath + folderPath);
  //   let newRoboFileName = `${key}.png`;
  //   let newRobo = folderImages.child(newRoboFileName);
  //   console.log('STORAGE:', newRobo.fullPath)

  //   const proxyurl = "https://cors-anywhere.herokuapp.com/";

  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', proxyurl + imgUrl, true);
  //   xhr.responseType = 'blob';
  //   // if (folderPath === 'images/moods') {
  //   //   xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  //   //   xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  //   // }
  //   xhr.onload = function (e) {
  //     if (this.status == 200) {
  //       var myBlob = this.response;
  //       console.log('what is myBlob', myBlob)
  //       newRobo.put(myBlob).then(snap => {
  //         console.log('File Upload Complete: ', newRobo.fullPath)
  //       })
  //       // myBlob is now the blob that the object URL pointed to.
  //     }
  //   };
  //   xhr.send();
  // }





  toggleTaskReminder() {
    let newToggleVal = this.state.taskOrReminder === 'task' ? 'reminder' : 'task';
    this.setState({
      taskOrReminder: newToggleVal
    })

  }

        // <Route path="/snor/level-1/1b/1c/1d/1e" component={RemindersIndex} />


  
  render() {
    return(
      <div>
        <h2>This is the SNOR INDEX</h2>

        <Route path="/snor/level-1/1b/1c/1d" component={AvatarOutput} />
        
        <Route path='/snor/level-1/1b/1c/1d/1e' render={(props) => {
          return (
            <div>
            <p>this can be a cool switch flip thing?</p>
            <button type='button' onClick={this.toggleTaskReminder}>
              { this.state.taskOrReminder === 'task'
                ? 'Switch To Reminders'
                : 'Switch To Tasks'
              }
            </button>
            </div>
          );
        }} />

        { this.state.taskOrReminder === 'task' &&
          <Route path="/snor/level-1" component={TasksIndex} />
        }

        { this.state.taskOrReminder === 'reminder' &&
          <Route path="/snor/level-1/1b/1c/1d/1e" component={RemindersIndex} />
        }


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



        <Route path='/snor/level2-splash' render={(props) => {
          return (
            <div>
              <h3>welcome to level 2!!!!: snor/level2-splash</h3>
              <h4>Level 2</h4>
              <p>Greetings snorling. I forgot to give you a delete button. Here you go</p>
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

        <Route path='/snor/level4-splash' render={(props) => {
          return (
            <div>
              <h3>welcome to level 4!!!!: snor/level4-splash</h3>
              <h4>Level 4</h4>
              <p>Snorling...Sorry to keep interrupting your productivity...</p>
              <p>But I need to run...snorville is growing, and I'm stuck in :: meeting hell ::</p>
              <p>Don't you worry though, I'm leaving you in the hands of {this.props.userPath.avatarName}</p>
              <p>He has served me well and should be a suitable assistant</p>
              <p>If he doesn't work out, I'm also giving you 2 re-roll tokens.</p>
              <p><em>:: maybe a link to reroll token faq ::</em></p>
              <img src={this.props.userPath.avatarUrl}/>
              <button type='button' onClick={this.startLevel4}>Let's Go!</button>
            </div>
          );
        }} />

        <Route path='/snor/level5-splash' render={(props) => {
          return (
            <div>
              <img className='avatar-25' src={this.props.userPath.avatarUrl} />
              <h3>welcome to level 5!!!!: snor/level5-splash</h3>
              <h4>Level 5</h4>
              <p>{this.props.userPath.avatarName} here...with some exciting news!</p>
              <p>Now that :: BOSS NAME :: has assigned me as your personal assistant,</p>
              <p>well...I'm kinda bored :( So I was thinking, I could remind you of</p>
              <p>upcoming apointments, meetings, or just tasks you'd like to schedule.</p>
              <p>Give it a whirl, and I'll stop in to let ya know when something is near :: creative time counter ::</p>
              <p><em>:: when did you become a droid, {this.props.userPath.avatarName}? ::</em></p>
              <button type='button' onClick={this.startLevel5}>Let's Go!</button>
            </div>
          );
        }} />



        </div>
      );
    }
  }
  

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setPathLevel, setAvatarUrl, setAvatarName, setAvatarTokens }, dispatch);
}

function mapStateToProps(mall) {
  return { 
    currentUser: mall.currentUser,
    userPath: mall.userPath
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnorIndex);
