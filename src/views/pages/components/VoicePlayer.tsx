import React, { Component } from 'react'
import {
    Button,
    UncontrolledTooltip
  } from "reactstrap";

class VoicePlayer extends Component<any, any> {
  speech;

  constructor (props) {
    super(props)

    if ('speechSynthesis' in window) {
      this.speech = this.createSpeech()
    } else {
      console.warn('The current browser does not support the speechSynthesis API.')
    }

    this.state = {
      started: false,
      playing: false
    }
  }

  createSpeech = () => {
    const defaults = {
      text: '',
      volume: 1,
      rate: 1,
      pitch: 1,
      lang: 'en-US'
    }

    let speech = new SpeechSynthesisUtterance()

    Object.assign(speech, defaults, this.props)

    return speech
  }

  onSpeak = text => {
    this.speech.text = text;
    window.speechSynthesis.speak(this.speech)
  }

  speak = () => {
    this.speech.text = this.props.text;
    window.speechSynthesis.speak(this.speech)
    this.setState({ started: true, playing: true })
  }

  cancel = () => {
    window.speechSynthesis.cancel()
    this.setState({ started: false, playing: false })
  }

  pause = () => {
    window.speechSynthesis.pause()
    this.setState({ playing: false })
  }

  resume = () => {
    window.speechSynthesis.resume()
    this.setState({ playing: true })
  }

  componentWillReceiveProps ({ pause }) {
    if (pause && this.state.playing && this.state.started) {
      return this.pause()
    }

    if (!pause && !this.state.playing && this.state.started) {
      return this.resume()
    }
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    const events = [
      { name: 'start', action: this.props.onStart },
      { name: 'error', action: this.props.onError },
      { name: 'pause', action: this.props.onPause },
      { name: 'resume', action: this.props.onResume }
    ]

    events.forEach(e => {
      this.speech.addEventListener(e.name, e.action)
    })

    this.speech.addEventListener('end', () => {
      this.setState({ started: false })
    //   this.props.onEnd()
    })

    if (this.props.play) {
      this.speak()
    }
  }

  componentWillUnmount () {
    this.cancel()
  }

  render () {
    return (
      <>
          <a
            className="table-action table-action-transcript"
            href="#"
            id="tooltip123539273"
            onClick={ () => this.speak()}
          >
            <i className="fas fa-volume-up" />
          </a>
        {/* <Button
            className="btn-slack btn-icon-only rounded-circle"
            color="default"
            type="button"
            onClick={ () => this.speak()}
        >
            <span className="btn-inner--icon">
                <i className="fas fa-volume-up"></i>
            </span>
        </Button> */}
      </>
    )
  }
}

export default VoicePlayer