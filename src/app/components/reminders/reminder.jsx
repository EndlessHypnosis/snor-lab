import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from "react-redux";
import FireBaseTools from '../../utils/firebase';

class Reminder extends Component {
  constructor(props) {
    super(props);

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
        return 'reminder-primary';
    }
  }

  render() {
    return(
      <div>
        { !(this.props.details.status === 'delete') &&

          <div className='ubuntu-gray-medium'>
            <p className={this.whatClassNameAmI()}>
              <span><strong>Title:</strong> {this.props.details.title}</span>
              <span><strong>Hour:</strong> {this.props.details.hour}</span>
              <span><strong>Minute:</strong> {this.props.details.minute}</span>
            </p>
            <button className='btn-primary-small' onClick={this.deleteReminder}>Delete</button>
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
