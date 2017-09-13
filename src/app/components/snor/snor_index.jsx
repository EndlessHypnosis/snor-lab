import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SnorIndex extends Component {
  constructor(){
    super();

    this.state={
      none: 'none'
    }
  }

  render() {
    return(
      <div>
        <h1>Welcome to the snorLab</h1>
        <h3>this is the starting point from level 0</h3>
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
