import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FireBaseTools from '../../utils/firebase';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import Reminder from './reminder';

import { setAvatarUrl } from '../../actions/index';


class RemindersIndex extends Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      reminderTitle: '',
      reminderHour: '',
      reminderMinute: '',
      userReminderList: {}
    }
  
    // init binds
    this.onFormReminderAdd = this.onFormReminderAdd.bind(this);

    // init globals
    this.fbRefSimpleReminders = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/simple-reminders`);

  }


  componentDidMount() {

    if (this.props.currentUser) {
      this.fbRefSimpleReminders.off();
      this.listenForReminders();
    }

  }


  listenForReminders() {
    console.log(`LISTENER ATTACHED TO [users/${this.props.currentUser.uid}/simple-reminders]`);

    this.fbRefSimpleReminders.once('value', snap => {
      let stateCopy = Object.assign({}, this.state.userReminderList);
      console.log('REMINDER .ONCE CALL:', snap, ' | val: ', snap.val());
      if (snap.val()) {
        Object.keys(snap.val()).forEach(reminder => {
          stateCopy[reminder] = snap.val()[reminder];
        });
        this.setState({
          userReminderList: stateCopy
        });
      }
    }).then(stuff => {
      console.log('ONCE FINISHED!!REMINDERS!!', stuff);
      this.actualReminderListener();
      this.actualReminderUpdateListener();
    })
  }

  actualReminderListener() {
    this.fbRefSimpleReminders.on('child_added', snap => {
      let stateCopy = Object.assign({}, this.state.userReminderList);
      // only add if it's not there yet...another listener has the update
      if (!stateCopy[snap.key]) {
        stateCopy[snap.key] = snap.val();
        this.setState({
          userReminderList: stateCopy
        })
      }
    })
  }

  actualReminderUpdateListener() {
    this.fbRefSimpleReminders.on('child_changed', snap => {
      let stateCopy = Object.assign({}, this.state.userReminderList);

      // this is an update so key must exist
      if (stateCopy[snap.key]) {
        stateCopy[snap.key] = snap.val();
        this.setState({
          userReminderList: stateCopy
        }, () => {
          this.levelUpChecker();
        })
      } else {
        console.log('ERROR - shouldnt reach this path. key should exist in reminder list')
      }

    })
  }

  levelUpChecker() {
    this.fbRefSimpleReminders.once('value', snap => {
      let pointTotal = snap.child('points').val();


      if (pointTotal > 15 && (pointTotal % 3 === 0)) {
        console.log('**&&**REMINDER: GIVING YOU A FREE AVATAR TOKEN :)')
        let currTokenCount = snap.child('avatarTokens').val();
        snap.child('avatarTokens').ref.set(currTokenCount + 1);
      }


    })
  }


  onFormReminderAdd(event) {
    event.preventDefault();

    let childRef = this.fbRefSimpleReminders.push({
      userEmail: this.props.currentUser.email,
      title: this.state.reminderTitle,
      hour: this.state.reminderHour,
      minute: this.state.reminderMinute,
      status: 'new'
    })


  }



  render() {

    const listOfReminders = Object.keys(this.state.userReminderList).map(reminder => {
      return  <Reminder key={reminder}
                        details={this.state.userReminderList[reminder]}
                        reminderId={reminder}
              />
    })

    return(
      <div>
        <h3>What can I help remember for you?</h3>
        <form id='frmReminder' role='form' onSubmit={this.onFormReminderAdd}>
          <input
            type='text'
            className='sl-btn'
            placeholder='Reminder'
            value={this.state.reminderTitle}
            onChange={(e) => { this.setState({ reminderTitle: e.target.value }); }}
          />
          <h4>TIME 24 hr format (<em>same day only in Beta</em>)</h4>
          <input
            type='text'
            placeholder='hour'
            value={this.state.reminderHour}
            onChange={(e) => { this.setState({ reminderHour: e.target.value }); }}
          />
          <input
            type='text'
            placeholder='minute'
            value={this.state.reminderMinute}
            onChange={(e) => { this.setState({ reminderMinute: e.target.value }); }}
          />

          <button
            type="submit"
            className="sl-btn"
          >Add Reminder</button>
          
          </form>

          <div>
            {listOfReminders}
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

export default connect(mapStateToProps, mapDispatchToProps)(RemindersIndex);