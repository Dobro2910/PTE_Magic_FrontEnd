import axios from 'axios';
import React, { Component, Fragment } from "react";
import {
    UncontrolledTooltip
  } from "reactstrap";
import HighlightPop from 'react-highlight-pop';
import { EXAM_GROUP } from 'src/config/constants';

class PteTextQuestion extends Component<any, any> {
    speech;
    isSpeaking: false;

    constructor(props) {
      super(props);

      if ('speechSynthesis' in window) {
        this.speech = this.createSpeech()
      } else {
        console.warn('The current browser does not support the speechSynthesis API.')
      }
    }

    state = {
        selectedText: null,
    };

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

        speech.onstart = function(event) {
          console.log('The utterance started to be spoken.');
        };

        speech.onend = function(event) {
          console.log('The utterance ended to be spoken.')
        };
    
        return speech
    }

    speak = () => {
        this.speech.text = this.state.selectedText;
        window.speechSynthesis.speak(this.speech)
    }
  
    handleMouseUp = () => {
        window.speechSynthesis.cancel();
        let selectedText = window.getSelection().toString();
        if (selectedText) {
            this.speech.text = selectedText;
            window.speechSynthesis.speak(this.speech)
        }
        this.setState({ selectedText });
    }

    render() {
        const { selectedText } = this.state;
        return (
            <div>
                { this.props.examGroup === EXAM_GROUP.MOCK_TEST ? 
                  <div className="pte-test-content-question">{this.props.text}</div>
                :
                  <HighlightPop 
                      popoverItems={itemClass => (
                      <Fragment>
                          <span 
                              className={itemClass} onClick={() => this.handleMouseUp() }>
                              <i className="text-super-lg fas fa-volume-up"></i>
                          </span>
                      </Fragment>
                      )}>
                      <div className="pte-test-content-question">{this.props.text}</div>
                  </HighlightPop>
                }
            </div>
      );
    }
  }
  
  export default PteTextQuestion;
