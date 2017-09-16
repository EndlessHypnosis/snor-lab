import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from "react-redux";
import FireBaseTools from '../../utils/firebase';

class Reminder extends Component {
  constructor(props) {
    super(props);

    // this.state = {

    // }

    this.deleteReminder = this.deleteReminder.bind(this);
    this.whatClassNameAmI = this.whatClassNameAmI.bind(this);


  }

  deleteReminder(e) {
    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-reminders/${this.props.reminderId}`);
    fbRef.update({
      status: 'delete'
    });

  }

  whatClassNameAmI() {
    switch (this.props.details.status) {
      case 'delete':
        return 'reminder-delete';
      default:
        return 'reminder-new';
    }
  }


  render() {
    return(
      <div>
        { !(this.props.details.status === 'delete') &&

          <div>
            <p className={this.whatClassNameAmI()}>
              <span>Title: {this.props.details.title}</span>
              <span>Hour: {this.props.details.hour}</span>
              <span>Minute: {this.props.details.minute}</span>
            </p>
            <button onClick={this.deleteReminder}>Delete</button>
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

export default connect(mapStateToProps, null)(Reminder);
