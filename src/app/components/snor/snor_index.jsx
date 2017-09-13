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
    };

    // setup this ref globbaly so i can turn off the listener
    // in the component did unmount or something like that
    this.fbRefCurrentLevel = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

  }
  
  componentDidMount(){

    this.initFireBaseListeners();

  }

  whereDoYouBelong(currentLevel = 'invalid') {

    if (currentLevel !== 'invalid') {
      this.props.history.push(currentLevel);
    }

    // switch (currentLevel) {
    //   case 'welcome-splash':
    //     this.props.history.push('/snor/welcome-splash');
    //   default:
    //     console.log('---UNKNOWN level/currentLevel VALUE---')
    // }
  }

  initFireBaseListeners() {
    console.log('---Setting up FireBase DB Listener---');
    
    // as global now
    // const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);

    this.fbRefCurrentLevel.on('value', snap => {
      console.log('FireBase Listener HIT in SNOR INDEX:', snap.val());
      this.whereDoYouBelong(snap.val().currentLevel);
    })
  }

  // componentWillUpdate(nextProps, nextState) {
  //   const fbRef = FireBaseTools.getDatabaseReference(`users/${this.props.currentUser.uid}/account/level`);
  //   fbRef.once('value', snap => {
  //     console.log('COMPONENT WILL UPDATE _ SNOR INDEX');
  //     this.whereDoYouBelong(snap.val().currentLevel);
  //   })    
  // }

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
