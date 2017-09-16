import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from "react-redux";
import FireBaseTools from '../../utils/firebase';

class Reminder extends Component {
  constructor(props) {
    super(props);

    // this.state = {

    // }
  }


  render() {
    return(
      <div>
        <p>{this.props.details.title}</p>
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
