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

        <Route path="/snor/level-1/1b/1c/1d" component={AvatarOutput} />
        <Route path='/snor/level-1' render={(props) => {
          return (
          <div className='card-primary card-flex-column'>

          <Route path='/snor/level-1/1b/1c/1d/1e' render={(props) => {
            return (
              <div>
                <button type='button' className="btn-primary btn-mega" onClick={this.toggleTaskReminder}>
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

        </div>
          );
        }} />

        <Route path='/snor/welcome-splash' render={(props) => {
          return (
            <div>
              <div className='card-primary'>
                <p>You're ready to embark on your journey of productivity.</p>
                <p>For now, you're only allowed to enter simple tasks.</p>
                <p>Something tells me that'll change soon ;)</p>
              </div>
              <button type='button' className='btn-primary btn-mega' onClick={this.startLevel1}>Let's Go!</button>
            </div>
          );
        }} />



        <Route path='/snor/level2-splash' render={(props) => {
          return (
            <div>
              <div className='card-primary'>
                <p>Greetings snorLing,</p>
                <p>I forgot to give you a delete button, but that's OK</p>
                <p>You'll soon see there's lots to discover here in the snorLab.</p>
              </div>
              <button type='button' className='btn-primary btn-mega' onClick={this.startLevel2}>Thanks!</button>
            </div>
          );
        }} />

        <Route path='/snor/level3-splash' render={(props) => {
          return (
            <div>
              <div className='card-primary'>
                <p>Hello again. Looks like you've been busy, so I was thinking...</p>
                <p>Maybe you could use a description field for your tasks.</p>
                <p>Don't worry, it's not required...I never know what I'm describing either</p>
              </div>
              <button type='button' className="btn-primary btn-mega" onClick={this.startLevel3}>Let's Go!</button>
            </div>
          );
        }} />

        <Route path='/snor/level4-splash' render={(props) => {
          return (
            <div>
              { this.props.userPath.avatarUrl &&
                <img src={this.props.userPath.avatarUrl} className='avatar-30-hug'/>
              }
              { !this.props.userPath.avatarUrl &&
                <p>loading...</p>
              }
              <div className='card-primary'>
                <p>Sorry to keep interrupting your productivity...but I have to get going.
                Don't you worry though, I'm leaving you in the hands of {this.props.userPath.avatarName},
                who has served me well and should be a suitable assistant. Just dont ask about the force <i className="icon ion-happy-outline"></i></p>
                <p>If {this.props.userPath.avatarName} doesn't work out, I'm also giving you 2 re-roll tokens.
                You can use these to ask for a new assistant.</p>
                </div>
              <button type='button' className='btn-primary btn-mega' onClick={this.startLevel4}>Continue</button>
            </div>
          );
        }} />

        <Route path='/snor/level5-splash' render={(props) => {
          return (
            <div>
              <img src={this.props.userPath.avatarUrl} className='avatar-30-hug' />
              <div className='card-primary'>
                <p>Hey snorLing, now that I'm your personal assistant,
                well...I'm kinda bored :( So I was thinking, I could remind you of
                upcoming appointments, meetings, or just tasks you'd like to schedule.</p>
                <p>Give it a whirl, and I'll stop in to let ya know when something needs your attention.</p>
                <p><em>I should tell you however, my memory bank is wiped every night,
                so until my master gives me an upgrade, reminders are limited to same day only.</em></p>
                <button type='button' className="btn-primary btn-mega" onClick={this.startLevel5}>Let's Go!</button>
              </div>
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
