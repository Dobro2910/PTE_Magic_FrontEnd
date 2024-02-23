import React from "react";
import ReactPlayer from "react-player";
import PteProgressBar from "./pte-progress-bar";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import Slider from "@material-ui/core/Slider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import LinearProgress from "@material-ui/core/LinearProgress";
export default class PteAudioPlayer extends React.Component<any, any> {
  player;

  constructor(props) {
    super(props);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
  }

  state = {
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false,
    started: false,
    label: "Status: Playing...",
    time: 0,
    countdownDuration: 0,
  };

  componentDidMount() {}

  componentWillUnmount() {}

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onEnded = () => {
    // tslint:disable-next-line
    console.log("onEnded");
    this.setState({ playing: this.state.loop });
    this.props.onCompleted();
    this.setState({ label: "Status: Completed" });
  };

  setVolume = (e, newValue) => {
    this.setState({ volume: newValue });
  };

  stop = () => {
    this.setState({ url: null, playing: false });
  };

  onPlay = () => {
    // tslint:disable-next-line
    console.log("onPlay");
    this.setState({ started: true, playing: true });
  };
  onPause = () => {
    // tslint:disable-next-line
    console.log("onPause");
    this.setState({ playing: false });
  };

  onDuration = (duration) => {
    // tslint:disable-next-line
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  ref = (player) => {
    this.player = player;
  };

  onTimeUpdate({ time, duration }) {
    if (time && duration) {
      this.setState({ time, countdownDuration: duration });
    }
  }

  onCountdownFinish = () => {
    console.log(`onCountdownFinish`);
    this.onPlay();
  };

  pressPlayPauseButton = (e) => {
    e.preventDefault();
    this.setState({ playing: !this.state.playing });
  };

  pressSeekAudioButton = (e) => {
    e.preventDefault();
    this.player.seekTo(0);
    // this.setState( {playing: !this.state.playing} );
  };

  pressPlaybackRateButton = (e, rate) => {
    e.preventDefault();
    this.setState({ playbackRate: rate });
  };

  renderAudioControlButtons = () => {
    const { playing, playbackRate } = this.state;
    const { examGroup } = this.props;
    return (
      <div className="mb-2">
        <>
          {/* <div className="text-center" style={{ marginTop: "-15px" }}>
            <a
              className="table-action action-audio"
              href="#"
              id={`tooltip1-audio-control`}
              onClick={(e) => this.pressPlayPauseButton(e)}
            >
              {playing && <i className="fas fa-pause" />}
              {!playing && <i className="fas fa-play" />}
            </a>
            <UncontrolledTooltip delay={0} target={`tooltip1-audio-control`}>
              {playing && <span>Pause audio</span>}
              {!playing && <span>Play audio</span>}
            </UncontrolledTooltip>
            <a
              className="table-action action-audio"
              href="#"
              id={`tooltip1-audio-replay`}
              onClick={(e) => this.pressSeekAudioButton(e)}
            >
              <i className="fas fa-redo" />
            </a>
            <UncontrolledTooltip delay={0} target={`tooltip1-audio-replay`}>
              Replay audio
            </UncontrolledTooltip>
          </div> */}
          <div className="text-right" style={{ marginTop: "-25px" }}>
            <a
              className={`table-action table-action-transcript ${
                playbackRate === 0.5 ? `playbackrate-active` : ""
              }`}
              href="#"
              id={`tooltip1-audio-control`}
              onClick={(e) => this.pressPlaybackRateButton(e, 0.5)}
            >
              <i>0.5x</i>
            </a>
            <a
              className={`table-action table-action-transcript ${
                playbackRate === 1.0 ? `playbackrate-active` : ""
              }`}
              href="#"
              id={`tooltip1-audio-control`}
              onClick={(e) => this.pressPlaybackRateButton(e, 1)}
            >
              <i>1x</i>
            </a>
            <a
              className={`table-action table-action-transcript ${
                playbackRate === 1.5 ? `playbackrate-active` : ""
              }`}
              href="#"
              id={`tooltip1-audio-control`}
              onClick={(e) => this.pressPlaybackRateButton(e, 1.5)}
            >
              <i>1.5x</i>
            </a>
            <a
              className={`table-action table-action-transcript ${
                playbackRate === 2.0 ? `playbackrate-active` : ""
              }`}
              href="#"
              id={`tooltip1-audio-control`}
              onClick={(e) => this.pressPlaybackRateButton(e, 2)}
            >
              <i>2x</i>
            </a>
          </div>
        </>
      </div>
    );
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
      started,
    } = this.state;
    const { countdownDuration, time } = this.state;
    const { examGroup } = this.props;

    // Renderer callback with condition
    return (
      <div>
        <ReactPlayer
          autoPlay
          ref={this.ref}
          className="react-player hide"
          url={this.props.url}
          playing={playing}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnded={this.onEnded}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />

        <Container className="mt--2">
          <Row className="justify-content-center">
            <Card
              className="bg-secondary mt-2 width-460"
              style={{ padding: 16, backgroundColor: "#fff" }}
            >
              <div style={{height: "40px"}}>
                <h5 className="h4 mb-0">
                  <span>Status: </span>
                  {started ? (
                    <span>Playing...</span>
                  ) : (
                    <>
                      <Timer
                        active
                        onFinish={this.onCountdownFinish}
                        duration={this.props.delay * 1000}
                        onTimeUpdate={this.onTimeUpdate}
                      />
                      {countdownDuration && time && (
                        <>
                          <span> Beginning in </span>
                          <div className="flip-number-count">
                            <Timecode
                              style={{ color: "red" }}
                              time={countdownDuration - time}
                            />
                          </div>
                          <span> seconds</span>{" "}
                        </>
                      )}
                    </>
                  )}
                </h5>
              </div>
              <div className="">
                <div className="mb-2">
                  <div className="mb-3">
                    <div
                      className="loaded display-flex-row"
                      style={{ margin: "24px 0px" }}
                    >
                      <a onClick={(e) => this.pressPlayPauseButton(e)}>
                        {playing && <PauseCircleOutlineIcon />}
                        {!playing && <PlayCircleOutlineIcon />}
                      </a>
                      {/* <PteProgressBar progress={played * 100} /> */}
                      <LinearProgress
                        classes={{
                          bar: "progress-listening",
                          colorPrimary: "progress-primary",
                        }}
                        style={{ width: "100%", marginLeft: "10px" }}
                        variant="determinate"
                        value={played * 100}
                      />
                      {/* <Slider
                      min={0}
                      max={1}
                      step={0.1}
                      value={volume}
                      onChange={this.setVolume}
                    /> */}
                    </div>
                    {examGroup === "QUESTION_BANK" &&
                      this.renderAudioControlButtons()}
                    <div
                      className="volume display-flex-row"
                      style={{ margin: "24px 0px" }}
                    >
                      <VolumeUpIcon />
                      <Slider
                        classes={{
                          root: "volumn-slider",
                          rail: "volumn-rail",
                          track: "volume-track",
                          thumb: "volume-thumb",
                        }}
                        style={{ width: "40%", marginLeft: "10px" }}
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={this.setVolume}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}