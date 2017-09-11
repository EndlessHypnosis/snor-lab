import React from "react";
import Sound from 'react-sound';
import make_yourself_comfortable from '../sounds/make_yourself_comfortable.mp3';

// or just take everything!
import * as Blueprint from "@blueprintjs/core";

export default () => {
    // <div className="pt-callout pt-intent-success">
    //   <h5>Callout Heading</h5>
    //   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, delectus!
    // </div>


    // isOpen={this.state.isOpen}
    const somestuff = (
                <div>
                    <Blueprint.Button onClick={() => {
                                            toggleDialog();
                                        }} text="Show dialog" />
                    <Blueprint.Dialog
                        iconName="inbox"
                        isOpen={true}
                        onClose={() => {
                                    toggleDialog();
                                }}
                        title="Dialog header"
                        className="pt-dark"
                    >
                        <div className="pt-dialog-body">
                            Some content
                            <Sound url="/src/app/sounds/welcome_to_the_show.mp3" playStatus={Sound.status.PLAYING}/>
                        </div>
                        <div className="pt-dialog-footer">
                            <div className="pt-dialog-footer-actions">
                                <Blueprint.Button text="Secondary" />
                                <Blueprint.Button
                                    intent={Blueprint.Intent.PRIMARY}
                                    onClick={() => {
                                        toggleDialog();
                                        let sound = new Audio(make_yourself_comfortable);
                                        sound.play();
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


    const toggleDialog = () => {
        console.log('toggle activiated');
        // this.setState({ isOpen: !this.state.isOpen })
    };




    return <div> This is the home page {somestuff} </div>;
};
