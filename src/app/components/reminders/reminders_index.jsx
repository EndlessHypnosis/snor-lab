import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FireBaseTools from '../../utils/firebase';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';

import { setAvatarUrl } from '../../actions/index';


class RemindersIndex extends Component {
  constructor(props) {
    super(props);
  }

  // init state

  // init binds

  render() {

    return(
      <div>
        Reminder Index here!
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