import React, { Component } from "react";
import Sound from "react-sound";
import make_yourself_comfortable from "../sounds/make_yourself_comfortable.mp3";
import FireBaseTools from '../utils/firebase';

// or just take everything!
import * as Blueprint from "@blueprintjs/core";

export default class HomeIndex extends Component {
  constructor() {
    super();

    this.state = {
      isOpenDialogStart: false,
      taskTitle: ''
    };

    const fbRef = FireBaseTools.getDatabaseReference('tasks');
    fbRef.on('value', snap => {
      console.log('db val:', snap.val())
    })
  }


  toggleDialog() {
    console.log("toggle activiated");

    this.setState({
      isOpenDialogStart: !this.state.isOpenDialogStart
    })
  };

  addTask(e) {
    FireBaseTools.fetchUser()
      .then(res => {
        console.log('LOGGED IN USER:', res);
        FireBaseTools.getDatabaseReference(`users/${res.uid}/tasks`).set({
          title: this.state.taskTitle,
          user: res.email
        });
    })

    // console.log('E:', e.target, 'VAL:', this.state.taskTitle)
    // FireBaseTools.getDatabaseReference('tasks/${}').set({
    //   title: 'this is first task',
    //   user: '123'
    // });
  }

  render() {

    const somestuff = (
      <div>
        <Blueprint.Button
          onClick={() => {
            this.toggleDialog();
          }}
          text="Show dialog"
        />

        <input
          type="text"
          className="pt-input"
          value={this.state.taskTitle}
          onChange={(e) => { this.setState({taskTitle: e.target.value}); }}
        />
        <button
          type="button"
          className="pt-button"
          onClick={(e) => { this.addTask(e); }}
        >Add Task</button>



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


    return(
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
  
