import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
// @ts-ignore
import warningMock from "src/assets/img/gif/mock_test_warning.gif";
import {Button as ButtonMT} from "@material-ui/core";

class CancelDialog extends React.Component<any, any> {
    render() {
        const {open,mockTest} = this.props
        return (
            <Dialog fullScreen open={open}  className="mkt-dialog">
                <div className="mkt-dialog-box">
                    <div className="mkt-dialog-icon">
                        <img src={warningMock} alt="Warning Mock" className="mkt-dialog-image"/>
                    </div>
                    <div className="mkt-dialog-title">
                        Are you sure to cancel this mock test ?
                    </div>
                    <div className="mkt-dialog-ticket">
                        {mockTest ? mockTest.name : ""}
                    </div>
                    <div className="mkt-dialog-content">
                        This mock test will re-started if you click to YES
                    </div>
                    <div className="mkt-dialog-button">
                        <ButtonMT
                            className="mkt-dialog-start-button"
                            onClick={() => {
                                this.props.resetExam()
                            }}
                        >
                            YES
                        </ButtonMT>
                        <ButtonMT
                            className={"mkt-dialog-return-button"}
                            onClick={this.props.close}
                        >
                           NO
                        </ButtonMT>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default CancelDialog;