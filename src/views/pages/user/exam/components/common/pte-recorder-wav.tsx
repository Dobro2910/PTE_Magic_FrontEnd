import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import React from 'react';
import { IPteQuestion } from 'src/shared/model/pte-question.model';
import Countdown from 'react-countdown-now';
import PteProgressBar from './pte-progress-bar';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import moment from 'moment';
import { APP_LOCAL_DATETIME_FORMAT, RECORDED_FILE_EXTENSION } from 'src/config/constants';
import { beep } from 'src/utils/pte-utils';

// Videojs record
import 'video.js/dist/video-js.min.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.min.css';
import 'videojs-record/dist/css/videojs.record.css';

import videojs from 'video.js';
import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

import wavesurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
wavesurfer.microphone = MicrophonePlugin;

import Recorder from 'recorderjs/dist/recorder.js'

import 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
import 'videojs-record/dist/videojs.record.js';
import 'videojs-record/dist/plugins/videojs.record.lamejs.min.js';
import { logErrorMessage } from 'src/utils/upload-utils';
import { confirmAlert } from 'react-confirm-alert'; // Import

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import VoiceRecognition from './VoiceRecognition';

const defaultVideoJsOptions = {
  controls: true,
  width: 300,
  height: 150,
  plugins: {
    wavesurfer: {
      src: 'live',
      waveColor: '#36393b',
      progressColor: 'black',
      debug: true,
      cursorWidth: 1,
      msDisplayMax: 20,
      hideScrollbar: true
    },
    record: {
      audio: true,
      video: false,
      maxLength: 40,
      debug: true,
      // audioMimeType: 'audio/wav',
      // audioEngine: 'lamejs',
      // audioWorkerURL: '../content/js/lame-worker/worker-realtime.js',
      // audioSampleRate: 16000,  // 44100
      // audioBitRate: 256 //128
    }
  }
};


var URL = (window as any).URL || (window as any).webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							    //Recorder.js object
var input; 							  //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
var audioContext //audio context to help us record

export class PteRecorderWav extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onTimerUpdate = this.onTimerUpdate.bind(this);
    this.onTimerUpdateCountdown = this.onTimerUpdateCountdown.bind(this);
    this.onTimerFinish = this.onTimerFinish.bind(this);
    this.triggerStopRecord = this.triggerStopRecord.bind(this);
    this.triggerStartRecord = this.triggerStartRecord.bind(this);
  }

  countdown: Countdown;
  player;
  videoNode;

  componentDidMount() {
    let videoJsOptions = { ...defaultVideoJsOptions };
    videoJsOptions.plugins.record.maxLength = this.props.length;
    // instantiate Video.js
    this.player = videojs(this.videoNode, videoJsOptions, () => {
      // print version information at startup
      const version_info =
        'Using video.js ' +
        videojs.VERSION +
        ' with videojs-record ' +
        videojs.getPluginVersion('record') +
        ', videojs-wavesurfer ' +
        videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' +
        wavesurfer.VERSION;
      videojs.log(version_info);
    });

    this.player.on('deviceReady', () => {
      console.log('deviceReady !');
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log(`started recording, time: ${moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT)}`);
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log(`finished recording, time: ${moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT)}`, this.player.recordedData);
      const url = window.URL.createObjectURL(this.player.recordedData);
      this.storeRecordInfo(url, this.player.recordedData);
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });

    setTimeout(() => {
      console.log(this.player.record().getDevice());
    });

    setTimeout(() => {
      if (!this.player.record()._deviceActive) {
        this.setState({ deviceError: true });
        // toast.error('Device not active, can not recording.');
        logErrorMessage('Device not active, can not recording.', '', 'DEVICE_NOT_ACTIVE');
        // Show confirm dialog
        this.confirmPermission();
      }
      // this.player.record().getDevice();
    }, 3000);
  }

  componentWillUnmount() {
    this.triggerStopRecord();
    if (this.player) {
      this.player.record().destroy();
      this.player.dispose();
    }
  }

  onTimerUpdate({ time, duration }) {
    let progress = 100 - 100*(duration - time)/duration;
    setTimeout(() => {
      this.setState({ progress });
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
    transcript: '',
    markedTranscript: '',
    score: 0,
    audioLink: null,
    deviceError: false,
    blobRecoder: null,

    duration: 0,
    time: 0
  };

  confirmPermission = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Additional permissions for Chrome</h1>
            <div>
              Click the <strong>allow</strong> button to enable microphone permissions.{' '}
            </div>
            <div>
              {' '}
              If the button is not displayed, refer to{' '}
              <a className="confirm-link" href="https://www.youtube.com/watch?feature=youtu.be&v=2hJqHR42Fk0" target="_blank">
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
      closeOnClickOutside: false
    });
  };

  controlAudio(status) {
    this.setState({ status: status });
  }

  triggerStartRecord = () => {
    if (!this.player.record()._deviceActive) {
      console.log('Device or microphone not active');
      return;
    }

    if (this.state.statusRecord !== 'running' && this.state.statusRecord !== 'completed') {
      if (this.props.question.type !== 'SPEAKING_REPEAT_SENTENCE') {
        beep();
      }
      // tslint:disable-next-line
      console.log('triggerStartRecord, time: ' + moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT));
      // this.controlAudio('recording'); // start
      this.setState({ startedDelay: false });
      this.setState({ statusRecord: 'running' });

      if (this.player.record()._deviceActive) {
        // this.player.record().start();
        var constraints = { audio: true, video:false }
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
          audioContext = new AudioContext({ sampleRate:16000});
          console.log("Format: 1 channel pcm @ " + audioContext.sampleRate/1000+"kHz");
          gumStream = stream;
          input = audioContext.createMediaStreamSource(stream);
          rec = new Recorder(input,{numChannels:1})
          rec.record()
          console.log("Recording started");
        }).catch(function(err) {
        });
      }
    }
  };

  triggerStopRecord = () => {
    // tslint:disable-next-line
    console.log('triggerStopRecord, time: ' + moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT));
    // this.controlAudio('inactive'); // start
    this.setState({ started: true, statusRecord: 'completed' });

    // if (this.player.record().isRecording()) {
    if (rec.recording){
      console.log("recorder stop");
      //tell the recorder to stop the recording
      rec.stop();
      //stop microphone access
      gumStream.getAudioTracks()[0].stop();
      //create the wav blob and pass it on to createDownloadLink
      rec.exportWAV(this.onFinishRecord);
    }
  };

  onFinishRecord = (blob) => {
    console.log(`onFinishRecord`)
    var url = URL.createObjectURL(blob);
    this.storeRecordInfo(url, blob);

    rec.clear();
  }

  ref = countdown => {
    this.countdown = countdown;
  };

  storeRecordInfo = (url, blob) => {
    let filename = 'recording_' + this.props.question.type + '_' + new Date().getTime() + RECORDED_FILE_EXTENSION;
    // tslint:disable-next-line
    console.log(`save storeRecordInfo, group: ${this.props.examGroup}`);
    this.setState({ audioSrc: url, blobRecoder: blob, audioLink: filename });

    // Call back to parent to notify has data
    let answer = {
      ...this.state,
      answer: this.state.audioLink,
      blob: this.state.blobRecoder
    };
    // tslint:disable-next-line
    console.log('recorder: ' + JSON.stringify(answer));
    this.props.onProcessRecordData(answer);
  };

  // Get answer of common component
  getAnswer = () => {
    this.triggerStopRecord();
  };

  onCountdownFinish = () => {
    console.log(`onCountdownFinish`);
    this.triggerStartRecord();
  }

  onTimerUpdateCountdown({ time, duration }) {
    if (time && duration) {
      this.setState({ time, duration });
    }
  }

  onResultRecognition = ({ finalTranscript }) => {
    // const result = finalTranscript;
    console.log(finalTranscript);
    this.setState({ transcript: this.state.transcript + ' ' + finalTranscript });
  };

  render() {
    const { startedDelay, statusRecord, progress } = this.state;
    const { duration, time } = this.state;

    return (
      <>
        <Container className="mt--2">
          <Row className="justify-content-center">
              <Card className="bg-secondary mt-2 width-460">
                <CardHeader>
                  <h5 className="h4 mb-0 text-center">Recordered Answer</h5>
                </CardHeader>
                <CardBody className="">
                {this.state.deviceError ? (
                  <div className="text-center device-danger">
                    <span>Microphone device missing error.</span>
                  </div>
                ) : (
                  <div className="mb-2">
                    {/* <div className="mb-3">
                      <span>Current Status:</span>
                    </div> */}

                    <div className="text-left pte-margin-bottom-10 ng-hide" aria-hidden="true">
                      { this.props.recording && startedDelay &&
                        // <div>
                        //   <Countdown date={Date.now() + this.props.delay * 1000} renderer={rendererDelay} />
                        // </div>
                        <>
                          <Timer active onFinish={this.onCountdownFinish} 
                              duration={ this.props.delay * 1000 } 
                              onTimeUpdate={this.onTimerUpdateCountdown} />
                            { duration && time && 
                              <><span>Status: Begining in { Math.round((duration - time)/1000) } seconds</span> </>
                            }
                        </>
                      }
                      { statusRecord === 'completed' && <span>Status: Completed</span> }
                      { statusRecord === 'running' &&
                        <>
                          <span>
                            Status: Recording...
                            <Timer active onFinish={this.onTimerFinish} duration={this.props.length * 1000} onTimeUpdate={this.onTimerUpdate}>
                              <Timecode />
                            </Timer>
                          </span>
                        </>
                      }

                      <div className="loaded">
                        <PteProgressBar key={ `pte-recorder-progress` } progress={ progress } />
                      </div>
                    </div>
                  </div>
                )}
                </CardBody>
              </Card>
          </Row>
        </Container>

        <div className="hide">
          <div data-vjs-player>
            <video id="myAudio" ref={node => (this.videoNode = node)} className="video-js vjs-default-skin" />
          </div>
          {(this.state.statusRecord === 'running' || this.state.statusRecord === 'completed') && (
            <VoiceRecognition
              onResult={this.onResultRecognition}
              continuous={true}
              lang="en-US"
              stop={this.state.statusRecord === 'completed'}
            />
          )}
        </div>
      </>
    );
  }
}

export default PteRecorderWav;
