import React, { Component } from "react";
import { connect } from "react-redux";
import Sound from "react-sound";
import make_yourself_comfortable from "../sounds/make_yourself_comfortable.mp3";
import FireBaseTools from '../utils/firebase';

// or just take everything!
import * as Blueprint from "@blueprintjs/core";

class HomeIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenDialogStart: false,
      taskTitle: '',
      userTaskList: {}
    };

    this.onFormTaskAdd = this.onFormTaskAdd.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    console.log('COMPONENT WILL REC PROPS - OLD:', this.props, ' | NEW:', nextProps);

    if (!this.props.currentUser && nextProps.currentUser) {
      console.log('LISTENING to nextProps');
      this.listenForTasks(nextProps);
    }
  }

  componentDidMount() {

    console.log('COMPONENT DID MOUNT: what are props:', this.props)
    if (this.props.currentUser) {
      console.log('LISTENING to this.props');
      this.listenForTasks(this.props);
    }
    


    // FireBaseTools.fetchUser()
    //   .then(res => {
    //     console.log('LOGGED IN USER:', res);
    //     console.log('PROPS:', this.props);
    //     this.setState({
    //       uid: res.uid
    //     })
    //   })
  }

  actualTaskListener(myProps) {
    const fbRef = FireBaseTools.getDatabaseReference(`users/tasklist/${myProps.currentUser.uid}`);
    //
    fbRef.on('child_added', snap => {
      let stateCopy = Object.assign({}, this.state.userTaskList);
      console.log('SNAP from users/tasklist watcher:', snap.key)
      // only add if it's not there yet. could run into issues later with this, may need to rethink
      if (!stateCopy[snap.key]) {
        stateCopy[snap.key] = snap.val();
        this.setState({
          userTaskList: stateCopy
        })
      }
    })
  }

  listenForTasks(myProps) {

    //
    // ref.on('child_added') will return all children and then maintain a listener for more.
    // ref.on('value') just detects change in path item itself?
    //
    
    // how do we store the current user logged in "uid" so then we just listen for that here:
    console.log(`LISTENER ATTACHED TO [users/tasklist${myProps.currentUser.uid}]`);
    const fbRef = FireBaseTools.getDatabaseReference(`users/tasklist/${myProps.currentUser.uid}`);
    // Before we setup our listener, let's pre load
    // the userTaskList so we can avoid all these renders
    //
    fbRef.once('value', snap => {
      let stateCopy = Object.assign({}, this.state.userTaskList);
      console.log('ONE TIME .ONCE CALL:', snap, ' | val: ', snap.val());
      // make sure there is a snap val before setting
      if (snap.val()) {
        Object.keys(snap.val()).forEach(task => {
          stateCopy[task] = snap.val()[task];
        });
        this.setState({
          userTaskList: stateCopy
        });
      }
    }).then(stuff => {
      console.log('ONCE FINISHED!!!!!!!!!!!!!!!', stuff);
      this.actualTaskListener(myProps);
    })

    



    // var users = [];
    // usersRef.on(‘child_added’, function (snap) {
    //   users.push(snap.val()); // Push children to a local users array
    // });

  }



  toggleDialog() {
    console.log("toggle activiated");

    this.setState({
      isOpenDialogStart: !this.state.isOpenDialogStart
    })
  };

  addTask(e) {

    console.log('addTask(e):', this.props.currentUser.uid);

    //
    // simple firebase set (insert)
    //

    // FireBaseTools.getDatabaseReference(`users/${res.uid}/tasks`).set({
    //   title: this.state.taskTitle,
    //   user: res.email
    // });

    //
    // firebase push (for lists of data)
    //

    let fbRef = FireBaseTools.getDatabaseReference(`users/tasklist/${this.props.currentUser.uid}`);
    let childRef = fbRef.push({ 
      userEmail: this.props.currentUser.email,
      title: this.state.taskTitle
    });
    //^ you can do it in one line like above, or like this here below:

    // let childRef = fbRef.push();
    // we can get its id using key()
    // console.log('my new shiny id is ', childRef);
    // now it is appended at the end of data at the server
    // childRef.set({ foo: 'bar' });


    // console.log('E:', e.target, 'VAL:', this.state.taskTitle)
    // FireBaseTools.getDatabaseReference('tasks/${}').set({
    //   title: 'this is first task',
    //   user: '123'
    // });
  }

  onFormTaskAdd(event) {
    event.preventDefault();
    console.log('ADDING TASK FOR USER:', this.props.currentUser.uid);


    let fbRef = FireBaseTools.getDatabaseReference(`users/tasklist/${this.props.currentUser.uid}`);
    let childRef = fbRef.push({
      userEmail: this.props.currentUser.email,
      title: this.state.taskTitle
    });

  }

  render() {
    console.log('--APP RENDER--');

    const listOfTasks = Object.keys(this.state.userTaskList).map( task => {
      return <p key={task}>{this.state.userTaskList[task].title}</p>
    })

    const somestuff = (
      <div>
        <Blueprint.Button
          onClick={() => {
            this.toggleDialog();
          }}
          text="Show dialog"
        />

        <form id="frmTask" role="form" onSubmit={this.onFormTaskAdd}>
          <input
            type="text"
            className="pt-input"
            value={this.state.taskTitle}
            onChange={(e) => { this.setState({ taskTitle: e.target.value }); }}
          />
          <button
            type="submit"
            className="pt-button"
            // onClick={(e) => { this.addTask(e); }}
          >Add Task</button>
        </form>
        
        <div>
          {listOfTasks}
        </div>



        <Blueprint.Dialog
          iconName="inbox"
          isOpen={this.state.isOpenDialogStart}
          onClose={() => {
            this.toggleDialog();
          }}
          title="Dialog header"
          className="pt-dark"
        >
          <div className="pt-dialog-body">some content
        ((111))
        </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Blueprint.Button text="Secondary" />
              <Blueprint.Button
                intent={Blueprint.Intent.PRIMARY}
                onClick={() => {
                  this.toggleDialog();
                  // let sound = new Audio(make_yourself_comfortable);
                  // sound.play();
                  // how do i render a component here in an onclick?
                  // <Sound url="/src/app/sounds/make_yourself_comfortable.mp3" playStatus={Sound.status.PLAYING} />;
                }}
                text="Primary"
              />
            </div>
          </div>
        </Blueprint.Dialog>
      </div>
    );


    return (
      <div>
        This is the home page {somestuff}
      </div>
    );

  }

}

// <div className="pt-callout pt-intent-success">
//   <h5>Callout Heading</h5>
//   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, delectus!
// </div>

// 111: <Sound url="/src/app/sounds/welcome_to_the_show.mp3" playStatus={Sound.status.PLAYING}/>
// isOpen={this.state.isOpen}



// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchUser, logoutUser }, dispatch);
// }

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, null)(HomeIndex);
