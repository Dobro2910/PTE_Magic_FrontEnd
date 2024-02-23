import React, { Component } from 'react';
import MicRecorder from 'mic-recorder';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import ReactPlayer from 'react-player';
import {Button} from "@material-ui/core";
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const recorder = new MicRecorder({
  encoder: 'wav', // default is mp3, can be wav as well
  sampleRate: 16000, // default is 44100, it can also be set to 16000 and 8000.
});

const actions = {
  BEGINNING: 'BEGINNING',
  PLAYING: 'PLAYING',
  COMPLETED: 'COMPLETED',
};

export class MtRecorderWav extends Component {
  constructor() {
    super();
    this.state = {
      status: actions.BEGINNING,
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

  onStart = async () => {
    const json = await recorder.start().catch((e) => {
      console.error(e);
    });
    if (json.active) {
      this.setState({ status: actions.PLAYING, blobURL: null });
    }
  };

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      const { duration } = this.state;
      this.setState({
        ...state,
        currentTime: Math.floor(state.played * duration),
      });
    }
  };

  onDuration = (duration) => {
    this.setState({ duration });
  };

  ref = (player) => {
    this.player = player;
  };

  onStop = async () => {
    const json = await recorder
      .stop()
      .getAudio()
      .catch((e) => {
        alert('We could not retrieve your message');
        console.log(e);
      });
    if (json) {
      const [buffer, blob] = json;
      const fileName = `audio-${Date.now()}.wav`;
      const file = new File(buffer, fileName, {
        type: blob.type,
        lastModified: Date.now(),
      });
      // this.props.recordAudio(file);
      const blobURL = URL.createObjectURL(file);
      console.log(blobURL);
      // this.setState({status: actions.COMPLETED, blobURL});
    }
  };

  onCurrentTimeChange = (currentTime) => {
    const played = currentTime / this.state.duration;
    this.player.seekTo(parseFloat(played));
    this.setState({ currentTime });
  };

  onRecordAudio = () => {
    const { status } = this.state;
    if (status === actions.PLAYING) this.onStop();
    else this.onStart();
  };

  onPlay = () => this.setState({ started: true, playing: true });

  onPause = () => this.setState({ playing: false });

  onTimerUpdate = ({ time, duration }) => {
    this.setState({ time, duration });
  };

  onEnded = () => {
    const { loop } = this.state;
    this.setState({ playing: loop });
  };

  // ValueLabelComponent = (children, open, value) => {
  //   return (
  //     <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
  //       {children}
  //     </Tooltip>
  //   );
  // }

  render() {
    const {
      status,
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
    const type = status === actions.PLAYING ? 'primary' : 'default';

    return (
      <div style={{display: "flex",justifyContent: "center"}}>
        <div className="recorder-wav-check">
          <div className="record-wav-title">Record Answer</div>
          <p className="current-status">Current Status</p>
          <div>
            {started ? (
              <Timer
                active={timer}
                duration={12 * 1000}
                onFinish={this.onCountUpFinish}
                onTimeUpdate={this.onTimerUpdate}
              >
                <Timecode />
              </Timer>
            ) : (
              <p style={{ display: 'flex' }}>
                Beginning in
                <span style={{ padding: '0 5px' }}>
                <Timer
                  active
                  duration={delay * 1000}
                  onFinish={this.onCountdownFinish}
                  onTimeUpdate={this.onTimerUpdate}
                />
                <Timecode time={duration - time} />
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
          <div className="wav-list-btn">
            <Button type={type} size="large" className="btn-wav" onClick={this.onRecordAudio}>
              Record
            </Button>
            <Button type={type} size="large" className="btn-wav" onClick={this.onRecordAudio}>
              Playback
            </Button>
            <Button type={type} size="large" className="btn-wav" onClick={this.onRecordAudio}>
              Stop
            </Button>
          </div>

          <ReactPlayer
            autoPlay
            ref={this.ref}
            className="react-player hide"
            url={blobURL}
            playing={playing}
            fileconfig={{
              attributes: { autoPlay: true },
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

export default MtRecorderWav;
