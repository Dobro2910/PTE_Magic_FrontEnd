import React, {Component} from 'react';
import {Button as ButtonMT} from "@material-ui/core";

export default class ListeningFIBL extends React.Component<any, any> {

  render() {
    const {step} = this.props
    return (
      <div className="mkt-intro-footer">
        <div className="mkt-intro-footer-container">
          <div className="mkt-intro-footer-button">
            {
              step > 1
              ?
                (
                  <ButtonMT
                    className="mkt-intro-footer-button-prev"
                    onClick={() => this.props.handleState(step-1)}
                  >
                    Prev
                  </ButtonMT>
                )
              : ""
            }

            <ButtonMT
              className="mkt-intro-footer-button-next"
              onClick={() => this.props.handleState(step+1)}
            >
              Next
            </ButtonMT>
          </div>
        </div>
      </div>
    );
  }
}
