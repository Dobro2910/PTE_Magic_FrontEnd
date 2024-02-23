import React, { Component } from 'react';
import { toast } from 'react-toastify';
import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers';
import { initTranscript, storedTranscript } from 'src/reducers/transcript';

@connect(
  ({ transcript }: IRootState) => ({
    transcript: transcript.transcript
  }),
  {
    initTranscript,
    storedTranscript
  }
)
class VoiceRecognition extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const SpeechRecognition = this.myWindow.SpeechRecognition || this.myWindow.webkitSpeechRecognition;

    if (SpeechRecognition != null && SpeechRecognition !== undefined) {
      this.recognition = this.createRecognition(SpeechRecognition);
    } else {
      console.warn('The current browser does not support the SpeechRecognition API.');
      toast.warn('The current browser does not support the SpeechRecognition API.', { autoClose: 3000 });
      this.recognition = null;
    }
  }

  myWindow = window as any;
  recognition;

  createRecognition = SpeechRecognition => {
    let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    // Object.assign(recognition, defaults, this.props);

    return recognition;
  };

  bindResult = event => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + ' ';
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    // toast.success(finalTranscript);

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far.
    // We only need the current one.
    // let current = event.resultIndex;

    // Get a transcript of what was said.
    // let transcript = event.results[current][0].transcript;

    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    // let mobileRepeatBug = current === 1 && transcript === event.results[0][0].transcript;
    // if (!mobileRepeatBug) {
    //   finalTranscript += transcript;
    // }
    let transcriptTmp = this.props.transcript + " " + finalTranscript;
    console.log(transcriptTmp);
    this.props.storedTranscript(transcriptTmp);
    this.props.onResult({ interimTranscript, finalTranscript });
  };

  bindError = event => {
    switch (event.error) {
      case 'no-speech':
        // toast.error('No speech was detected. Try again.', { autoClose: 2000 });
        break;
      case 'aborted':
        break;
      default:
        // toast.error(`Error type: ${event.error}, message: ${event.message}`, { autoClose: 2000 });
        break;
    }
  };

  start = () => {
    // toast.success('Voice actived.', { autoClose: 3000 });
    this.recognition && this.recognition.start();
  };

  stop = () => {
    this.recognition && this.recognition.stop();
  };
  

  abort = () => {
    this.recognition && this.recognition.abort();
  };

  componentWillReceiveProps({ stop }) {
    if (stop) {
      setTimeout(() => this.stop(), 3000); // delay 3s before stop
    }
  }

  componentDidMount() {
    this.props.initTranscript();
    if (this.recognition == null) {
      return;
    }

    const events = [{ name: 'start', action: this.props.onStart }, { name: 'end', action: this.props.onEnd }];

    events.forEach(event => {
      this.recognition.addEventListener(event.name, event.action);
    });

    this.recognition.addEventListener('result', this.bindResult);
    this.recognition.addEventListener('error', this.bindError);

    this.start();
  }

  componentWillUnmount() {
    this.abort();
  }

  render() {
    return null;
  }
}

export default VoiceRecognition;
