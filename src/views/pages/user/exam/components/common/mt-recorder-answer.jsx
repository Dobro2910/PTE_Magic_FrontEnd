import React, {Component} from 'react';
import MicRecorder from 'mic-recorder';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import ReactPlayer from 'react-player';
import Slider from "@material-ui/core/Slider";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const recorder = new MicRecorder({
  encoder: 'wav', // default is mp3, can be wav as well
  sampleRate: 16000, // default is 44100, it can also be set to 16000 and 8000.
});

export class MtRecorderAnswer extends Component {
  constructor() {
    super();
    this.state = {
      started: false,
      timer: false,
      duration: 0,
      time: 0,
      delay: 3,
      blobURL: null,
      volume: 5,
      playbackRate: 1.0,
      playing: false,
      loop: false,
      seeking: false,
      currentTime: 0,
    };
  }

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      const {duration} = this.state;
      this.setState({
        ...state,
        currentTime: Math.floor(state.played * duration),
      });
    }
  };

  onDuration = (duration) => {
    this.setState({duration});
  };

  ref = (player) => {
    this.player = player;
  };

  onCurrentTimeChange = (currentTime) => {
    const played = currentTime / this.state.duration;
    this.player.seekTo(parseFloat(played));
    this.setState({currentTime});
  };

  onPlay = () => this.setState({started: true, playing: true});

  onPause = () => this.setState({playing: false});

  onTimerUpdate = ({time, duration}) => {
    this.setState({time, duration});
  };

  onEnded = () => {
    const {loop} = this.state;
    this.setState({playing: loop});
  };

  render() {
    const {
      blobURL,
      duration,
      time,
      timer,
      delay,
      started,
      playing,
      loop,
      playbackRate,
      volume,
      currentTime,
    } = this.state;

    return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className="recorder-wav-check recorder-intro-yourself">
          <div className="record-wav-title">Record Answer</div>
          <p className="current-status">Current Status</p>
          <div >
            {started ? (
              <Timer
                active={timer}
                duration={12 * 1000}
                onFinish={this.onCountUpFinish}
                onTimeUpdate={this.onTimerUpdate}
              >
                <Timecode/>
              </Timer>
            ) : (
              <p style={{display: 'flex'}}>
                Recording in
                <span style={{padding: '0 5px'}}>
                <Timer
                  active
                  duration={delay * 1000}
                  onFinish={this.onCountdownFinish}
                  onTimeUpdate={this.onTimerUpdate}
                />
                <Timecode time={duration - time}/>
              </span>
                seconds
              </p>
            )}
          </div>
          <Slider
            // ValueLabelComponent={() => {this.ValueLabelComponent("benit",true,"mocktest")}}
            aria-label="custom thumb label"
            defaultValue={0}
          />
          <ReactPlayer
            autoPlay
            ref={this.ref}
            className="react-player hide"
            url={blobURL}
            playing={playing}
            fileconfig={{
              attributes: {autoPlay: true},
            }}
            onPlay={this.onPlay}
            onPause={this.onPause}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume / 10}
            onEnded={this.onEnded}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
        </div>
      </div>
    );
  }
}

export default MtRecorderAnswer;
