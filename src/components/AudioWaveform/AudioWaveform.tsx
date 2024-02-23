import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

// import 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
import { WaveformContainer, Wave, PlayButton, InfoButton, DownloadButton } from './Waveform.styled';
import ReactDOM from "react-dom";
import moment from 'moment';
import {
  Row,
  Col,
  Input
} from "reactstrap";
import { randomRequestId } from 'src/utils/pte-utils';

export default class AudioWaveform extends Component<any, any> {

  $el;
  wavesurfer;
  $waveform;

  state = {
    playing: false,
    totalTime: 0,
    currentTime: 0,
    remainingTime: 0
  };

  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave');

    let cursorPlugin = CursorPlugin.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            'font-size': '10px'
        }
    });
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: '#c7c7c7',
      progressColor: '#23527c',
      height: 80,
      responsive: true,
      barWidth: 2,
      cursorWidth: 1,
      hideScrollbar: true,
      cursorColor: 'transparent',
      // backend: 'WebAudio',
      plugins: [
        cursorPlugin
      ]
    });
    // if (this.props.source) {
      this.wavesurfer.load(this.props.source);
    // }

    this.wavesurfer.on('pause', () => {
      // console.log('pause');
      // this.wavesurfer.params.container.style.opacity = 0.7;
      this.setState({ playing: false });
    });

    this.wavesurfer.on('ready', () => {
      // this.wavesurfer.play();
    });

    this.wavesurfer.on('audioprocess', () => {
      if(this.wavesurfer.isPlaying()) {
          var totalTime = this.wavesurfer.getDuration() * 1000,
              currentTime = this.wavesurfer.getCurrentTime() * 1000,
              remainingTime = (totalTime - currentTime)  * 1000;
          
          this.setState({ totalTime, currentTime, remainingTime });
      }
    });
  };

  componentWillUnmount() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.wavesurfer.playPause();
  };

  onChangePlaybackRate = async (e) => {
    let value = e.target.value;
    console.log(`onChangePlaybackRate: ${value}`)
    this.wavesurfer.setPlaybackRate(value);
  }

  downloadFile = async (e) => {
    e.preventDefault();
    var link = document.createElement("a");
    link.download = `${randomRequestId()}.wav`;
    link.target = "_blank";
    // Construct the uri
    link.href = this.props.source;
    document.body.appendChild(link);
    link.click();
    // Cleanup the DOM
    document.body.removeChild(link);
  }

  render() {
    return (
      <Row>
        <Col md="12" lg="12">
          <WaveformContainer>
            <PlayButton onClick={this.handlePlay} >
              { !this.state.playing ? <i className="fa fa-play text-dark" aria-hidden="true"></i>
              : 
              <i className="fa fa-pause text-dark" aria-hidden="true"></i>
              }
            </PlayButton>
            <Wave id="waveform" className='wave border-center' />
            <InfoButton>
              <div className="ml-2 mr-2 breadcrumb-item" style={{ minWidth: '85px' }}>
                <span>{ `${moment.utc(this.state.currentTime).format("mm:ss")} / ${ moment.utc(this.state.totalTime).format("mm:ss") }` }</span> 
              </div>
              <div className="mr-2">
                <Input className="form-control-sm" type="select" name="select" id="playbackRateSelect" defaultValue="1" onChange={this.onChangePlaybackRate}>
                  <option value="0.5" >0.5x</option>
                  <option value="1">1x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </Input>
              </div>
              { this.props.allowDownload && 
                <DownloadButton className="hidden-lg-down">
                  <div style={{ minWidth: '30px' }}>
                    <i className="fa fa-download" aria-hidden="true" onClick={this.downloadFile}></i>
                  </div>
                </DownloadButton>
              }
            </InfoButton>
          </WaveformContainer>
        </Col>
      </Row>
    );
  }
}