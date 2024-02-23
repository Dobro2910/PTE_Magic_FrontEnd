import './pte-progress-bar.scss';

import React from 'react';

export interface IPteProgressBarProps {
  progress: number;
}

export interface IPteProgressBarState {}

export default class PteProgressBar extends React.Component<IPteProgressBarProps, IPteProgressBarState> {
  constructor(props) {
    super(props);
  }

  render() {
    var progress = {
      width: this.props.progress + '%'
    };

    return (
      <div>
        <div className="progress pte-progress">
          <div className="progress-bar progress-bar-success progress-bar-striped" style={progress}>
            <span />
          </div>
        </div>
      </div>
    );
  }
}
