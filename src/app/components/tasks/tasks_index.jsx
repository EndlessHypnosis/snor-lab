import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FireBaseTools from '../../utils/firebase';
import Task from './task';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { setAvatarUrl } from '../../actions/index';

//TODO:
// Need to add listener for not the insert, but the update
// to the tasks...so i can use the status to do actions
// like completed should remove buttons and strike through

//TODO:
// Deleting a task removes the counter for complete,
// making it hard to level up. Might need a new level up mechanic

class TasksIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskTitle: '',
      taskDesc: '',
      userTaskList: {}
    };

    this.onFormTaskAdd = this.onFormTaskAdd.bind(this);
    this.reroute = this.reroute.bind(this);

    this.fbRefSimpleTasks = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks`);
    this.fbRefCurrentLevel = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`)
    
  }


  // Need to review how we filling in the userTaskList array from the DB.
  // can probably be refactored to approach it differently
  // componentWillReceiveProps(nextProps) {
    // console.log('COMPONENT WILL REC PROPS - OLD:', this.props, ' | NEW:', nextProps);

    // if (!this.props.currentUser && nextProps.currentUser) {
    //   // console.log('LISTENING to nextProps');
    //   this.listenForTasks(nextProps);
    // }
  // }

  componentDidMount() {

    console.log('COMPONENT DID MOUNT: what are props:', this.props)
    if (this.props.currentUser) {
      // console.log('LISTENING to this.props');

      this.fbRefSimpleTasks.off();
      this.listenForTasks();
    }
  }

  // componentDidUpdate(prevProps, prevState) {

  levelUpChecker() {

    // let totalComplete = Object.keys(this.state.userTaskList).reduce((acum, task) => {
    //   if (this.state.userTaskList[task].status === 'complete') {
    //     acum ++;
    //   }
    //   return acum;
    // }, 0);

    this.fbRefCurrentLevel.once('value', snap => {
      console.log('----CHECK ME OUT:', snap.val());

      let pointTotal = snap.child('points').val();
      console.log('-----TOTAL SCORE:', pointTotal);

      //these if's could probably be combined into a function where we pass in the next lvel number??
      if (pointTotal === 3 && snap.child('currentLevel').val() === '/snor/level-1') { // TODO: set this level advance trigger
        snap.child('currentLevel').ref.set('/snor/level2-splash');
        console.log('WENT TO /snor/level2-splash')
        
        // dont think i need this anymore....
        // const fbRefB = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level/currentLevel`)
        // only update if at level-1
        // this.fbRefCurrentLevel.child('currentLevel').once('value', snap => {
        //   if (snap.val() === '/snor/level-1') {
        //     this.fbRefCurrentLevel.child('currentLevel').set('/snor/level2-splash');
        //   }
        // })
      }

  
      if (pointTotal === 6 && snap.child('currentLevel').val() === '/snor/level-1/1b') {
        snap.child('currentLevel').ref.set('/snor/level3-splash');
        console.log('WENT TO /snor/level3-splash')
      }

      if (pointTotal === 9 && snap.child('currentLevel').val() === '/snor/level-1/1b/1c') {
        
        FireBaseTools.addImageToStorage(this.props.currentUser.uid
          , `user/${this.props.currentUser.uid}/avatar`
          , `https://robohash.org/${this.props.currentUser.uid}`
          , this.props.currentUser.uid
        );

        snap.child('currentLevel').ref.set('/snor/level4-splash');
        console.log('WENT TO /snor/level4-splash');

        // set the avatar url of the userPath store
        // FireBaseTools.getStorageReference()
        //   .child(`snor/assets/user/avatar/${this.props.currentUser.uid}.png`)
        //   .getDownloadURL()
        //   .then(url => {
        //     console.log('******URL:', url);
        //     // this.props.setAvatarUrl(url);
        //   })


        // let whatisthis = FireBaseTools.getStorageReference().child(`snor/assets/user/avatar/${this.props.currentUser.uid}.png`)
        // debugger;
      }

      if (pointTotal > 9 && (pointTotal % 3 === 0)) {
        console.log('**&&**TASK: GIVING YOU A FREE AVATAR TOKEN :)')
        let currTokenCount = snap.child('avatarTokens').val();
        snap.child('avatarTokens').ref.set(currTokenCount + 1);
      }



      if (pointTotal === 14 && snap.child('currentLevel').val() === '/snor/level-1/1b/1c/1d') {
        snap.child('currentLevel').ref.set('/snor/level5-splash');
        console.log('WENT TO /snor/level5-splash')
      }





    })



  }



  actualTaskListener() {
    // const fbRef = FireBaseTools.getDatabaseReference(`users/${myProps.currentUser.uid}/simple-tasks`);
    //
    // fbRef.off();
    this.fbRefSimpleTasks.on('child_added', snap => {
      let stateCopy = Object.assign({}, this.state.userTaskList);
      // only add if it's not there yet. could run into issues later with this,
      // where updated tasks should still be 'updated', but because the key is there, it doesnt update
      if (!stateCopy[snap.key]) {
        stateCopy[snap.key] = snap.val();
        this.setState({
          userTaskList: stateCopy
        })
      }
    })
  }

  actualTaskUpdateListener() {
    // const fbRef = FireBaseTools.getDatabaseReference(`users/${myProps.currentUser.uid}/simple-tasks`);
    // console.log('UPDATE TASK WATCHER STARTED!');
    // fbRef.off();
    this.fbRefSimpleTasks.on('child_changed', snap => {

      
      
      let stateCopy = Object.assign({}, this.state.userTaskList);
      // console.log('TASK update watcher HIT:', snap.key)
      // is this right? where we check if key is there,
      // then update.
      if (stateCopy[snap.key]) {
        stateCopy[snap.key] = snap.val();
        this.setState({
          userTaskList: stateCopy
        }, () => {
          // see if its time to level up
          this.levelUpChecker();
        })
      } else {
        console.log('ERROR - shouldnt reach this path. key should exist in task list')
      }
    
    })
  }


  listenForTasks() {
    //
    // ref.on('child_added') will return all children and then maintain a listener for more.
    // ref.on('value') just detects change in path item itself?
    //

    // how do we store the current user logged in "uid" so then we just listen for that here:
    console.log(`LISTENER ATTACHED TO [users/${this.props.currentUser.uid}/simple-tasks]`);
    // const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks`);
    
    // Before we setup our listener, let's pre load
    // the userTaskList so we can avoid all these renders
    // do we really need to do this?
    this.fbRefSimpleTasks.once('value', snap => {
      let stateCopy = Object.assign({}, this.state.userTaskList);
      console.log('ONE TIME .ONCE CALL:', snap, ' | val: ', snap.val());
      // make sure there is a snap val before setting
      if (snap.val()) {
        Object.keys(snap.val()).forEach(task => {
          stateCopy[task] = snap.val()[task];
        });
        this.setState({
          userTaskList: stateCopy
        });
      }
    }).then(stuff => {
      console.log('ONCE FINISHED!!!TASKS!!', stuff);
      this.actualTaskListener();
      this.actualTaskUpdateListener();
    })

    // var users = [];
    // usersRef.on(‘child_added’, function (snap) {
    //   users.push(snap.val()); // Push children to a local users array
    // });
  }



  reroute(to) {
    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`)
    fbRef.update({
      currentLevel: to
    })

    // this.props.history.push(to);
  }


  onFormTaskAdd(event) {
    event.preventDefault();
    // console.log('ADDING TASK FOR USER:', this.props.currentUser.uid);

    // actual task add
    //

    // let fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks`);
    let childRef = this.fbRefSimpleTasks.push({
      userEmail: this.props.currentUser.email,
      title: this.state.taskTitle,
      description: this.state.taskDesc,
      status: 'new'
    }).then(response => {
      // console.log('Task Added Successfully');
      // saving random images
      // this.addImageToStorage(response.key, 'images/avatars', `https://robohash.org/${response.key}`);
      // this.addImageToStorage(response.key, 'images/moods', `https://api.adorable.io/avatars/200/${response.key}.png`);
    })
  }

  // https://api.adorable.io/avatars/200/abott@adorable.png

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


  render() {

    const listOfTasks = Object.keys(this.state.userTaskList).map(task => {
      return  <Task key={task} 
                    details={this.state.userTaskList[task]}
                    taskId={task}
              />
    })

    // this.props.history.push('/profile');

    return(
      <div>
      <h3>What's on your mind?</h3>
        <form id="frmTask" role="form" onSubmit={this.onFormTaskAdd}>
          <input
            type="text"
            className="sl-btn"
            placeholder="Task"
            value={this.state.taskTitle}
            onChange={(e) => { this.setState({ taskTitle: e.target.value }); }}
          />

          <Route path='/snor/level-1/1b/1c' render={(props) => {
            return (
              <div>
                <input
                  type="text"
                  placeholder="Description"
                  value={this.state.taskDesc}
                  onChange={(e) => { this.setState({ taskDesc: e.target.value }); }}
                />
              </div>
            )
          }} />


          <button
            type="submit"
            className="sl-btn"
          >Add Task</button>
        </form>

        <div>
          {listOfTasks}
        </div>
      </div>
    );

  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAvatarUrl }, dispatch);
}

function mapStateToProps(mall) {
  return { 
    currentUser: mall.currentUser,
    userPath: mall.userPath
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
