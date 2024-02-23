import React from 'react';
import { ANIMATION_IN, ANIMATION_OUT } from 'src/config/constants';
import { Animated } from 'react-animated-css';
import { IPteQuestion } from 'src/shared/model/pte-question.model';
import { uploadPoolCheck } from 'src/utils/upload-utils';

export interface IPteTimebreakState {
  enable: boolean;
}

export interface IPteTimebreakProps {
  onNextQuestionTimebreak?: Function;
  question?: IPteQuestion;
}

export class PteTimeBreak extends React.Component<any, IPteTimebreakState> {
  constructor(props) {
    super(props);
  }

  state = {
    enable: true
  };
  interval;

  componentDidMount() {
    if (this.props.question.timeBreak === 'WRITING') {
      this.setState({ enable: false });
      // Check interval
      // update every second
      this.interval = setInterval(() => {
        const checkUpload = uploadPoolCheck();
        this.setState({ enable: checkUpload });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
        <div className="text-center">
          <div className="grid-icon size-200 icon-tea mb-4">
          </div>

          <div className="pte-width-100 pte-margin-bottom-10">
            {this.state.enable ? (
              <div>
                <span className="m-r-10">
                  <i className="fas fa-check color-answer-correct" />
                </span>
                <span>All upload completed.</span>
              </div>
            ) : (
              <div>
                <span className="m-r-10">
                  <i className="fas fa-times color-answer-wrong" />
                </span>
                <span>Please wait a moment while uploading recordings ...</span>
              </div>
            )}
          </div>
        </div>
      </Animated>
    );
  }
}

export default PteTimeBreak;
