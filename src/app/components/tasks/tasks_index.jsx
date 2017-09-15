import React, { Component } from 'react';
import { connect } from "react-redux";
import FireBaseTools from '../../utils/firebase';
import Task from '../tasks/task';
import { Link } from 'react-router-dom';

//TODO:
// Need to add listener for not the insert, but the update
// to the tasks...so i can use the status to do actions
// like completed should remove buttons and strike through


class TasksIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskTitle: '',
      userTaskList: {}
    };

    this.onFormTaskAdd = this.onFormTaskAdd.bind(this);

  }


  // Need to review how we filling in the userTaskList array from the DB.
  // can probably be refactored to approach it differently
  componentWillReceiveProps(nextProps) {
    console.log('COMPONENT WILL REC PROPS - OLD:', this.props, ' | NEW:', nextProps);

    if (!this.props.currentUser && nextProps.currentUser) {
      console.log('LISTENING to nextProps');
      this.listenForTasks(nextProps);
    }
  }

  componentDidMount() {

    console.log('COMPONENT DID MOUNT: what are props:', this.props)
    if (this.props.currentUser) {
      console.log('LISTENING to this.props');
      this.listenForTasks(this.props);
    }


  }



  actualTaskListener(myProps) {
    const fbRef = FireBaseTools.getDatabaseReference(`users/${myProps.currentUser.uid}/simple-tasks`);
    //
    fbRef.on('child_added', snap => {
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

  actualTaskUpdateListener(myProps) {
    const fbRef = FireBaseTools.getDatabaseReference(`users/${myProps.currentUser.uid}/simple-tasks`);
    console.log('UPDATE TASK WATCHER STARTED!');
    fbRef.on('child_changed', snap => {

      let stateCopy = Object.assign({}, this.state.userTaskList);
      console.log('TASK update watcher HIT:', snap.key)
      // is this right? where we check if key is there,
      // then update.
      if (stateCopy[snap.key]) {
        stateCopy[snap.key] = snap.val();
        this.setState({
          userTaskList: stateCopy
        })
      } else {
        console.log('ERROR - shouldnt reach this path. key should exist in task list')
      }
    
    })
  }


  listenForTasks(myProps) {
    //
    // ref.on('child_added') will return all children and then maintain a listener for more.
    // ref.on('value') just detects change in path item itself?
    //

    // how do we store the current user logged in "uid" so then we just listen for that here:
    console.log(`LISTENER ATTACHED TO [users/${myProps.currentUser.uid}/simple-tasks]`);
    const fbRef = FireBaseTools.getDatabaseReference(`users/${myProps.currentUser.uid}/simple-tasks`);
    // Before we setup our listener, let's pre load
    // the userTaskList so we can avoid all these renders
    // do we really need to do this?
    fbRef.once('value', snap => {
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
      console.log('ONCE FINISHED!!!!!!!!!!!!!!!', stuff);
      this.actualTaskListener(myProps);
      this.actualTaskUpdateListener(myProps);
    })

    // var users = [];
    // usersRef.on(‘child_added’, function (snap) {
    //   users.push(snap.val()); // Push children to a local users array
    // });
  }



  deleteTask(task) {
    // let prop = 'id of property to delete'
    // delete myObject[prop]
  }


  onFormTaskAdd(event) {
    event.preventDefault();
    console.log('ADDING TASK FOR USER:', this.props.currentUser.uid);

    // actual task add
    //

    let fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks`);
    let childRef = fbRef.push({
      userEmail: this.props.currentUser.email,
      title: this.state.taskTitle,
      status: 'new'
    }).then(response => {
      console.log('Task Added Successfully');
      // saving random images
      // this.addImageToStorage(response.key, 'images/avatars', `https://robohash.org/${response.key}`);
      // this.addImageToStorage(response.key, 'images/moods', `https://api.adorable.io/avatars/200/${response.key}.png`);
    })
  }

  // https://api.adorable.io/avatars/200/abott@adorable.png

  addImageToStorage(key, folderPath, imgUrl) {
    // just playing around with storage here
    //

    let folderImages = FireBaseTools.getStorageReference().child(folderPath);
    let newRoboFileName = `${key}.png`;
    let newRobo = folderImages.child(newRoboFileName);
    console.log('STORAGE:', newRobo.fullPath)

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', proxyurl + imgUrl, true);
    xhr.responseType = 'blob';
    // if (folderPath === 'images/moods') {
    //   xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    //   xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // }
    xhr.onload = function (e) {
      if (this.status == 200) {
        var myBlob = this.response;
        console.log('what is myBlob', myBlob)
        newRobo.put(myBlob).then(snap => {
          console.log('File Upload Complete: ', newRobo.fullPath)
        })
        // myBlob is now the blob that the object URL pointed to.
      }
    };
    xhr.send();
  }


  render() {

    const listOfTasks = Object.keys(this.state.userTaskList).map(task => {
      return  <Task  key={task} 
                    details={this.state.userTaskList[task]}
                    taskId={task}
              />
    })

    // this.props.history.push('/profile');

    return(
      <div>
      <h3>What's on your mind?</h3>
      <Link to='/snor/level-1/1b'>advance to next level</Link>
      <Link to='/snor/level-1'>back again</Link>
        <form id="frmTask" role="form" onSubmit={this.onFormTaskAdd}>
          <input
            type="text"
            className="sl-btn"
            value={this.state.taskTitle}
            onChange={(e) => { this.setState({ taskTitle: e.target.value }); }}
          />
          <button
            type="submit"
            className="sl-btn"
          >Add Task</button>
        </form>

        <div>
          {listOfTasks}
        </div>
      </div>
    )

  }

}


function mapStateToProps(mall) {
  return { currentUser: mall.currentUser };
}

export default connect(mapStateToProps, null)(TasksIndex);
