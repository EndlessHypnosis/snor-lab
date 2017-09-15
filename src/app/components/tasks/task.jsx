import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from "react-redux";
import FireBaseTools from '../../utils/firebase';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state={
      taskInEditMode: false,
      editTaskInput: ''
    }

    this.saveEditTask = this.saveEditTask.bind(this);
    this.toggleCompleteTask = this.toggleCompleteTask.bind(this);

  }

  // componentDidMount() {
  //   this.setTaskStyle();
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setTaskStyle();
  // }

  // setTaskStyle() {

  // }

  saveEditTask() {

    if (this.state.taskInEditMode) {
      // save
      
      const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks/${this.props.taskId}`);
      fbRef.update({
        title: this.state.editTaskInput
      });

      this.setState({
        taskInEditMode: !this.state.taskInEditMode
      })

    } else {
      // swap to edit
      this.setState({
        taskInEditMode: !this.state.taskInEditMode,
        editTaskInput: this.props.details.title
      })

    }
  }



  toggleCompleteTask() {

    let newStatus = this.props.details.status === 'complete'
                    ? 'new'
                    : 'complete';

    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-tasks/${this.props.taskId}`);
    fbRef.update({
      status: newStatus
    });
  }


  deleteTask(task) {
    // let prop = 'id of property to delete'
    // delete myObject[prop]
  }



  render() {

    console.log('TASK STUFF HERE:', this.props)

    return(
      <div>

        { this.state.taskInEditMode &&
          <input  value={this.state.editTaskInput} 
                  className='task-edit'
                  onChange={(e) => {
                    this.setState({
                      editTaskInput: e.target.value
                    })
                  }}
          />
        }

        { !this.state.taskInEditMode &&
          <span className={
              this.props.details.status === 'complete'
              ? 'task-complete'
              : 'task-new'
            }
          >
            { this.props.details.title }
          </span>
        }


        <button onClick={this.saveEditTask}>
          {this.state.taskInEditMode ? 'Save' : 'Edit'}
        </button>

        <button onClick={this.toggleCompleteTask}>
          { this.props.details.status === 'complete'
            ? 'undo complete'
            : 'Complete'
          }
        </button>

        <Route path='/snor/level-1/1b' render={(props) => {
          return (
            <div>hi nick!</div>
          );
        }}  />

      </div>
    );
  }

}



function mapStateToProps(mall) {
  return { currentUser: mall.currentUser };
}

export default connect(mapStateToProps, null)(Task);
