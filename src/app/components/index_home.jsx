import React from "react";

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
                        </div>
                        <div className="pt-dialog-footer">
                            <div className="pt-dialog-footer-actions">
                                <Blueprint.Button text="Secondary" />
                                <Blueprint.Button
                                    intent={Blueprint.Intent.PRIMARY}
                                    onClick={() => {
                                        toggleDialog();
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
