import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FireBaseTools from '../../utils/firebase';
import { Route } from 'react-router';

class SnorIndex extends Component {
  constructor(props){
    super(props);

    this.state={
      none: 'none'
    }
    this.initFireBaseListeners();
  }

  initFireBaseListeners() {
    console.log('---Setting up FireBase DB Listener---');
    
    const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

    fbRef.on('value', snap => {
      console.log('FireBase Listener HIT in SNOR INDEX:', snap.val());

      switch(snap.val().currentLevel) {
        case 'welcome-splash':
          this.props.history.push('/snor/welcome-splash');
        default:
          console.log('---UNKNOWN level/currentLevel VALUE---')
      }

    })

  }

  // somehwere here in snor index, we could call a function,
  // or better yet have a listener to the database, and when
  // it detects a level upgrade, force the user to a new route :)

  
  render() {
    return(
      <div>
        <h1>This is the SNOR INDEX</h1>
        <Route path='/snor/welcome-splash' render={(props) => {
          return (
            <div>
              <h3>this is the starting point: welcome-splash</h3>
            </div>
          );
        }} />
      </div>
    );
  }
}


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchUser, logoutUser }, dispatch);
// }

function mapStateToProps(mall) {
  return { currentUser: mall.currentUser };
}

export default connect(mapStateToProps, null)(SnorIndex);
