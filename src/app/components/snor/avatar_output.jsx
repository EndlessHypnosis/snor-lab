import React, { Component } from 'react';
import { connect } from 'react-redux';
import FireBaseTools from '../../utils/firebase';
import { Route } from 'react-router';
import { bindActionCreators } from "redux";

class AvatarOutput extends Component {
  constructor() {
    super();
  }


  render() {
    return(
      <div>
        <p><strong>{this.props.userPath.avatarName}</strong></p>
        <img className='avatar-25' src={this.props.userPath.avatarUrl} />
      </div>
    );
  }

}


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ setPathLevel }, dispatch);
// }

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    userPath: mall.userPath
  };
}

export default connect(mapStateToProps, null)(AvatarOutput);
