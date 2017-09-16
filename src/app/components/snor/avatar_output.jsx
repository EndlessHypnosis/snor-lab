import React, { Component } from 'react';
import { Route } from 'react-router';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FireBaseTools from '../../utils/firebase';

class AvatarOutput extends Component {
  constructor(props) {
    super(props);

    this.reRollAvatar = this.reRollAvatar.bind(this);
  }

  reRollAvatar() {
    //re roll token here
    console.log('RE ROLL TOKEN AVATAR');
    let newAvatarId = FireBaseTools.randomString(10);
    // FireBaseTools.addImageToStorage(this.props.currentUser.uid, 'user/avatar', `https://robohash.org/${this.props.currentUser.uid}`);
    FireBaseTools.addImageToStorage(newAvatarId, `user/${this.props.currentUser.uid}/avatar`, `https://robohash.org/${newAvatarId}`, this.props.currentUser.uid);

  }


  render() {
    return(
      <div>
        <p><strong>{this.props.userPath.avatarName}</strong></p>
        <p><button type='button' onClick={this.reRollAvatar}>Get a New Assistant</button> 2 Tokens left</p>
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
