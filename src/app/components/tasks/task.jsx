import React, { Component } from 'react';
import { Route } from 'react-router';

export default class Task extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    console.log('TASK STUFF HERE:', this.props)

    return(
      <div>
        <div>
          {this.props.details.title}
          <button>Edit</button>
          <button onClick={() => {
            this.props.completeTask(this.props.taskId)
          }}>Complete</button>
          <Route path='/tasks/nick' render={(props) => {
            return (
              <div>hi nick!</div>
            );
          }}  />
        </div>
      </div>
    );
  }

}
