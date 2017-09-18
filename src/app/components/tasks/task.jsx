import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from "react-redux";
import FireBaseTools from '../../utils/firebase';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state={
      taskInEditMode: false,
      editTaskInput: '',
      editTaskDesc: ''
    }

    this.fbRefLevel = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

    this.saveEditTask = this.saveEditTask.bind(this);
    this.completeUncompleteTask = this.completeUncompleteTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.whatClassNameAmI = this.whatClassNameAmI.bind(this);
  }


  saveEditTask() {

    if (this.state.taskInEditMode) {
      // save
      
      const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks/${this.props.taskId}`);
      fbRef.update({
        title: this.state.editTaskInput,
        description: this.state.editTaskDesc
      });

      this.setState({
        taskInEditMode: !this.state.taskInEditMode
      })

    } else {
      // swap to edit
      this.setState({
        taskInEditMode: !this.state.taskInEditMode,
        editTaskInput: this.props.details.title,
        editTaskDesc: this.props.details.description
      })

    }
  }



  completeUncompleteTask() {

    let newStatus = this.props.details.status === 'complete'
                    ? 'new'
                    : 'complete';

    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks/${this.props.taskId}`);
    fbRef.update({
      status: newStatus
    });

    // update the level/points - this is what determins level up
    this.fbRefLevel.child('points').once('value', snap => {
      let upOrDown = newStatus === 'complete' ? 1 : -1;
      let newPointVal = parseInt(snap.val()) + upOrDown;
      snap.ref.set(newPointVal);
    })

  }


  deleteTask(e) {

    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks/${this.props.taskId}`);
    fbRef.update({
      status: 'delete'
    });

  }


  whatClassNameAmI() {

    switch (this.props.details.status) {
      case 'complete':
        return 'task-primary task-complete';
      case 'delete':
        return 'task-primary task-delete';
      default:
        return 'task-primary';
    }

  }


  render() {

    return(
      <div>
      
        { !(this.props.details.status === 'delete') &&
          <div>

            { this.state.taskInEditMode &&
              <div>
              <input  value={this.state.editTaskInput} 
                      className='input-primary'
                      placeholder='Task'
                      onChange={(e) => {
                        this.setState({
                          editTaskInput: e.target.value
                        })
                      }}
              />
              <Route path='/snor/level-1/1b/1c' render={(props) => {
                return (
                  <input value={this.state.editTaskDesc}
                    className='input-primary'
                    placeholder='Description'
                    onChange={(e) => {
                      this.setState({
                        editTaskDesc: e.target.value
                      })
                    }}
                  />
                )
              }} />
              </div>
            }

            { !this.state.taskInEditMode &&
              <p className={this.whatClassNameAmI()}>
            <span className='ubuntu-light-medium'>{this.props.details.title}</span>
                <Route path='/snor/level-1/1b/1c' render={(props) => {
                  return (
                    <span className='ubuntu-gray-medium'>
                      <i className="icon ion-ios-redo icon-inline"></i>
                      {this.props.details.description}
                    </span>
                  )
                }} />
              </p>
            }
            
            <div>
              <button onClick={this.saveEditTask} className="btn-primary-small">
                {this.state.taskInEditMode ? 'Save' : 'Edit'}
              </button>

              <button onClick={this.completeUncompleteTask} className="btn-primary-small">
                { this.props.details.status === 'complete'
                  ? 'undo complete'
                  : 'Complete'
                }
              </button>

              <Route path='/snor/level-1/1b' render={(props) => {
                return (
                    <button onClick={this.deleteTask} className="btn-primary-small">Delete</button>
                  )
                }}
              />
            </div>
          </div>
        }
      </div>
    );
  }

}



function mapStateToProps(mall) {
  return { 
    currentUser: mall.currentUser,
    userPath: mall.userPath
  };
}

export default connect(mapStateToProps, null)(Task);
