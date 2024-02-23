import 'video.js/dist/video-js.min.css';
// import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.min.css';
// import 'videojs-record/dist/css/videojs.record.css';

import React, { Component } from 'react';
import videojs from 'video.js'

const videoJsOptions = {
    autoplay: true,
    controls: false,
    poster: '',
    sources: [{
        src: '',
        type: ''
    }]
  }

export default class VideoPlayer extends Component<any, any> {
    player;
    videoNode;
  componentDidMount() {
    videoJsOptions.poster = this.props.poster;
    videoJsOptions.sources[0].src = this.props.video_link;
    videoJsOptions.sources[0].type = this.props.content_type;
    // instantiate Video.js
    this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <>	
        <div data-vjs-player>
          <video loop ref={ node => this.videoNode = node } className="video-js vjs-fluid vjs-big-play-centered"></video>
        </div> 
      </>
    )
  }
}