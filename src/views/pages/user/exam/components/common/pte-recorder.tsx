import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import React from "react";
import Countdown from "react-countdown-now";
import PteProgressBar from "./pte-progress-bar";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import moment from "moment";
import {
  APP_LOCAL_DATETIME_FORMAT,
  RECORDED_FILE_EXTENSION,
  EVENT,
} from "src/config/constants";
import { beep } from "src/utils/pte-utils";
import FlipNumbers from "react-flip-numbers";

import Recorder from "recorderjs/dist/recorder.js";

import { logErrorMessage } from "src/utils/upload-utils";
import { confirmAlert } from "react-confirm-alert"; // Import
import $ from "jquery";
import { CardBody, Container, Row, Col } from "reactstrap";
import VoiceRecognition from "./VoiceRecognition";
// import connect from 'redux-connect-decorator';
import { storeRecordStatus } from "src/reducers/store";
import { connect } from "react-redux";
import { createAudioContext, downSampleRate } from "src/utils/audio-utils";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import CustomButton from "../../../../../../components/CustomButton/Button.js";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Grid from "@material-ui/core/Grid";
import { sendEvent } from "src/reducers/store";
const { detect } = require("detect-browser");
const browser = detect();

var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var audioContext;
// var audioContext //audio context to help us record

export class PteRecorder extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onTimerUpdate = this.onTimerUpdate.bind(this);
    this.onTimerUpdateCountdown = this.onTimerUpdateCountdown.bind(this);
    this.onTimerFinish = this.onTimerFinish.bind(this);
    this.triggerStopRecord = this.triggerStopRecord.bind(this);
    this.triggerStartRecord = this.triggerStartRecord.bind(this);
  }

  countdown: Countdown;

  componentDidMount() {
    console.log(`pte recorder componentDidMount`);
    this.props.storeRecordStatus(null);
    audioContext = createAudioContext(16000);
    console.log(`audioContext`, audioContext);
    if (audioContext.state === "running") {
      this.initAudioRecoder();
    } else if (audioContext.state === "suspended") {
      this.onConfirmActiveAudio();
    }
  }

  componentWillUnmount() {
    console.log(`pte-record componentWillUnmount`);
    this.triggerStopRecord();
  }

  onTimerUpdate({ time, duration }) {
    let progress = 100 - (100 * (duration - time)) / duration;

    setTimeout(() => {
      let answerDuration = Math.floor(time / 1000);
      this.setState({ progress, answerDuration });
    }, 500);
  }

  onTimerFinish({ duration, progress, time }) {
    this.triggerStopRecord();
  }

  state = {
    status,
    audioSrc: null,
    started: false,
    startedDelay: true,
    statusRecord: null,
    progress: 0,
    transcript: "",
    markedTranscript: "",
    score: 0,
    audioLink: null,
    deviceError: false,
    blobRecoder: null,
    answerDuration: 0,
    duration: 0,
    time: 0,
    showRecordBtn: true,
  };

  initAudioRecoder = () => {
    console.log("PTE Recorder initAudioRecoder ...");
    var constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        console.log(
          "getUserMedia() success, stream created, initializing Recorder.js ..."
        );
        // audioContext =  new AudioContext();
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        // rec.record()
      })
      .catch((err) => {
        console.error("Device or microphone not active", err);
        this.setState({ deviceError: true });
        logErrorMessage(
          "Device not active, can not recording.",
          "",
          "DEVICE_NOT_ACTIVE"
        );
        // Show confirm dialog
        this.confirmPermission();
      });
  };

  activeAudioContext = () => {
    console.log(`activeAudioContext`);
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        this.initAudioRecoder();
      });
    }
  };

  onConfirmActiveAudio = () => {
    console.log("HELOOOOO");
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Additional permissions</h1>
            <div>
              Click the <strong>Allow</strong> button to enable record audio.{" "}
            </div>
            <div className="confirm-div-btn">
              <button
                onClick={() => {
                  this.activeAudioContext();
                  onClose();
                }}
              >
                Allow
              </button>
            </div>
          </div>
        );
      },
      closeOnClickOutside: false,
    });
  };

  confirmPermission = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Additional permissions for Chrome</h1>
            <div>
              Click the <strong>allow</strong> button to enable microphone
              permissions.{" "}
            </div>
            <div>
              {" "}
              If the button is not displayed, refer to{" "}
              <a
                className="confirm-link"
                href="https://www.youtube.com/watch?feature=youtu.be&v=2hJqHR42Fk0"
                target="_blank"
              >
                this guide
              </a>
              .
            </div>
            <div className="confirm-div-btn">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        );
      },
      closeOnClickOutside: false,
    });
  };

  controlAudio(status) {
    this.setState({ status: status });
  }

  triggerStartRecord = () => {
    if (
      this.state.statusRecord !== "running" &&
      this.state.statusRecord !== "completed"
    ) {
      this.props.storeRecordStatus("running");
      if (this.props.question.type !== "SPEAKING_REPEAT_SENTENCE" && browser.name !== "safari") {
        beep();
      }
      // tslint:disable-next-line
      console.log(
        "triggerStartRecord, time: " +
          moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT)
      );
      // this.controlAudio('recording'); // start
      this.setState({ startedDelay: false });
      this.setState({ statusRecord: "running" });

      if (rec) {
        console.log("Recording started");
        rec.record();
      }
    }
  };

  triggerStopRecord = () => {
    // tslint:disable-next-line
    console.log(
      "triggerStopRecord, time: " +
        moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT)
    );
    // this.controlAudio('inactive'); // start
    this.props.storeRecordStatus("completed");
    this.setState({ started: true, statusRecord: "completed" });

    if (rec && rec.recording) {
      console.log("recorder stop");
      //tell the recorder to stop the recording
      rec.stop();
      //stop microphone access
      gumStream.getAudioTracks()[0].stop();
      //create the wav blob and pass it on to createDownloadLink
      rec.exportWAV(this.onFinishRecord);
    }
  };

  onFinishRecord = async (blob) => {
    console.log(`onFinishRecord`);
    var URL = (window as any).URL || (window as any).webkitURL;
    try {
      let newBlob =
        browser.name === "safari" ? await downSampleRate(blob, 16000) : blob;
      var url = URL.createObjectURL(newBlob);
      this.storeRecordInfo(url, newBlob);
    } catch (err) {
      console.error(`Error when downSamplerate`, err);
      var url = URL.createObjectURL(blob);
      this.storeRecordInfo(url, blob);
    }
    rec.clear();
  };

  ref = (countdown) => {
    this.countdown = countdown;
  };

  storeRecordInfo = (url, blob) => {
    let filename =
      "recording_" +
      this.props.question.type +
      "_" +
      new Date().getTime() +
      RECORDED_FILE_EXTENSION;
    // tslint:disable-next-line
    console.log(`save storeRecordInfo, group: ${this.props.examGroup}`);
    this.setState({ audioSrc: url, blobRecoder: blob, audioLink: filename });

    // Call back to parent to notify has data
    let answer = {
      ...this.state,
      answer: this.state.audioLink,
      blob: this.state.blobRecoder,
      duration: this.state.answerDuration,
    };
    // tslint:disable-next-line
    console.log(answer);
    this.props.onProcessRecordData(answer);
  };

  // Get answer of common component
  getAnswer = () => {
    this.triggerStopRecord();
  };

  onCountdownFinish = () => {
    console.log(`onCountdownFinish`);
    this.triggerStartRecord();
  };

  onTimerUpdateCountdown({ time, duration }) {
    if (time && duration) {
      this.setState({ time, duration });
    }
  }

  onResultRecognition = ({ finalTranscript }) => {
    // const result = finalTranscript;
    console.log(finalTranscript);
    this.setState({
      transcript: this.state.transcript + " " + finalTranscript,
    });
  };

  onSkipWaitRecord = () => {
    this.props.sendEvent(EVENT.ON_SKIP_WAIT_RECORD);
  };

  render() {
    const { startedDelay, statusRecord, progress } = this.state;
    const { duration, time } = this.state;
    const { question } = this.props;

    // console.log(question)
    return (
      <>
        <Container className="mt--2">
          <Row className="justify-content-center">
            <Card
              className="bg-secondary mt-2 width-460"
              style={{ boxShadow: "none" }}
            >
              <CardContent className="" style={{ backgroundColor: "#fff" }}>
                {this.state.deviceError ? (
                  <div className="text-center device-danger">
                    <span>Microphone device missing error.</span>
                  </div>
                ) : (
                  <div className="mb-2">
                    {/* <span>Status:</span> */}
                    <div
                      className="text-center pte-margin-bottom-10 ng-hide"
                      aria-hidden="true"
                    >
                      {this.props.recording && startedDelay && (
                        <>
                          <Timer
                            active
                            onFinish={this.onCountdownFinish}
                            duration={this.props.delay * 1000}
                            onTimeUpdate={this.onTimerUpdateCountdown}
                          />
                          {duration && time && statusRecord !== "completed" && (
                            <>
                              <span>Begining in </span>
                              <div className="flip-number-count">
                                {/* <FlipNumbers
                                  play
                                  color="#fff"
                                  background="#ec0c38"
                                  width={20}
                                  height={20}
                                  numbers={`${Math.round(
                                    (duration - time) / 1000
                                  )}`}
                                /> */}
                                <Timecode
                                  style={{ color: "red" }}
                                  time={duration - time}
                                />
                              </div>
                              <span> seconds</span>{" "}
                            </>
                          )}
                        </>
                      )}
                      {statusRecord === "completed" && <span>Completed</span>}
                      {statusRecord === "running" && (
                        <>
                          <span>
                            Recording...
                            <Timer
                              active
                              onFinish={this.onTimerFinish}
                              duration={this.props.length * 1000}
                              onTimeUpdate={this.onTimerUpdate}
                            >
                              <Timecode />
                            </Timer>
                          </span>
                        </>
                      )}

                      <div className="loaded" style={{ marginTop: 20 }}>
                        {/* <PteProgressBar
                          key={`pte-recorder-progress`}
                          progress={progress}
                        /> */}
                        <LinearProgress
                          classes={{
                            bar: "progress-listening",
                            colorPrimary: "progress-primary",
                          }}
                          style={{ width: "100%" }}
                          variant="determinate"
                          value={progress}
                        />
                      </div>
                      {question.type === "SPEAKING_READ_ALOUD" ||
                      question.type === "SPEAKING_REPEAT_SENTENCE" ||
                      question.type === "SPEAKING_DESCRIBE_IMAGE" ||
                      question.type === "SPEAKING_RETELL_LECTURE"
                        ? this.state.showRecordBtn &&
                          statusRecord != "running" &&
                          statusRecord != "completed" && (
                            <>
                              <CustomButton
                                style={{
                                  marginTop: "15px",
                                  borderRadius: "50%",
                                  textAlign: "center",
                                  backgroundColor: "rgb(218, 220, 228)",
                                  border: "1px solid #000",
                                  width: 50,
                                  height: 50,
                                  color: "#000",
                                }}
                                onClick={() => {
                                  this.onSkipWaitRecord();
                                }}
                                justIcon
                              >
                                <MicNoneIcon fontSize="large" />
                              </CustomButton>
                              <p>Start record</p>
                            </>
                          )
                        : null}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Row>
        </Container>

        <div className="hide">
          {(this.state.statusRecord === "running" ||
            this.state.statusRecord === "completed") && (
            <VoiceRecognition
              onResult={this.onResultRecognition}
              continuous={true}
              lang="en-US"
              stop={this.state.statusRecord === "completed"}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.store,
});

const mapDispatchToProps = {
  storeRecordStatus,
  sendEvent,
};
// export default PteRecorder;

export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true,
})(PteRecorder);
