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
    console.log('#$#$#$:', FireBaseTools.addImageToStorage(newAvatarId, `user/${this.props.currentUser.uid}/avatar`, `https://robohash.org/${newAvatarId}`, this.props.currentUser.uid));

    let fbDBref = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);
    fbDBref.child('avatarTokens').once('value', snap => {
      let currentCount = parseInt(snap.val());
      snap.ref.set(currentCount - 1)
    })

  }


  render() {

    // let fbDBref = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);
    // fbDBref.child('avatarTokens').once('value', snap => {
    //   avatarTokenCount = parseInt(snap.val());
    // })

    // fbDBref.update({
    //   avatarTokens: snap.downloadURL,
    //   avatarName: data.name
    // })


    return(
      <div>
        <p><strong>{this.props.userPath.avatarName}</strong></p>
        {this.props.userPath.avatarTokens > 0 &&
          <div>
            <p>
              <button type='button' onClick={this.reRollAvatar}>
                Get a New Assistant
              </button>
              {this.props.userPath.avatarTokens} Tokens left
            </p>
          </div>
        }
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
