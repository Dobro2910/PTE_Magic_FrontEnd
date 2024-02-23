import React from 'react';

export interface IPteTextAnswerProps {
  length: number;
  onChange: Function;
  questionType: string;
}

export interface IPteTextAnswerState {
  status: any;
  textAnswer: string;
  isSpellCheck: boolean;
  curLength: number;
}

export default class PteTextAnswer extends React.Component<IPteTextAnswerProps, IPteTextAnswerState> {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.tinyMce = React.createRef();
  }

  componentWillMount() {}

  tinyMce;

  state = {
    status,
    textAnswer: '',
    isSpellCheck: false,
    curLength: 0
  };

  handleEditorChange = e => {
    // tslint:disable-next-line
    console.log('Content was updated:', e.target.getContent());
  };

  // Get answer of common component
  getAnswer = () => {
    return this.state.textAnswer;
  };

  onTextChange(e) {
    let words = e.target.value;
    let newTextAnswer = e.target.value;
    let wordsLength = 0;

    if (words.length === 1 && words[0] !== '') {
      wordsLength = 1;
    }

    for (let i = 1; i < words.length; i++) {
      if (this.isAlphabet(words[i]) && !this.isAlphabet(words[i - 1])) {
        wordsLength++;
        if (wordsLength === this.props.length + 1) {
          // wordsLength--;
          // newTextAnswer = words.substring(0, i);
          // alert('The maximum words are only ' + this.props.length + '!');
          // break;
        }
      } else if (this.isAlphabet(words[i]) && this.isAlphabet(words[i - 1])) {
        if (wordsLength === 0) {
          wordsLength = 1;
        }
      } else if (!this.isAlphabet(words[i]) && !this.isAlphabet(words[i - 1])) {
        continue;
      } else if (!this.isAlphabet(words[i]) && this.isAlphabet(words[i - 1])) {
        continue;
      }
    }
    this.setState({ textAnswer: newTextAnswer, curLength: wordsLength });
    this.props.onChange(newTextAnswer);
  }

  isAlphabet(character) {
    var numeric_char = character.charCodeAt(character);
    if (numeric_char > 64 && numeric_char < 91) return true;
    if (numeric_char > 96 && numeric_char < 123) return true;
    return false;
  }

  onSpellCheck() {
    console.log(`onSpellCheck`)
    this.setState({ isSpellCheck: !this.state.isSpellCheck });
  }

  render() {
    const { status, textAnswer, isSpellCheck, curLength } = this.state;
    return (
      <div>
        <div className={this.props.questionType === 'LISTENING_DICTATION' ? 'none' : 'col-md-12 margin-top30 padding0'}>
          {/* <div className="pte-row-check-spell">
            <div className="pte-inline-block">
              <label>
                <input className="pte-checkbot-spell" type="checkbox" defaultChecked={isSpellCheck} onClick={ () => this.onSpellCheck() } />
                Spell check
              </label>
            </div>
          </div> */}
        </div>
        <div className="col-md-12 padding0 mb-5">
          <div className="position-relative">
            {/* <Editor
              apiKey="8gczps98gt7mrolpeof3zztrbh7vrcl28en9e9gku5optmvh"
              initialValue="<p>This is the initial content of the editor</p>"
              ref={this.tinyMce}
              init={{
                // selector: 'textarea',
                plugins: 'wordcount,tinymcespellchecker',
                spellchecker_languages: 'English=en',
                menubar: false,
                toolbar: 'spellchecker',
                branding: false
              }}
              onChange={this.handleEditorChange}
            /> */}
            <textarea
              className="pte-input-writing"
              rows={10}
              placeholder="Writing at here"
              // onChange={this.handleChange.bind(this)}
              // value={this.state.textAnswer}
              // onBlur={this.handleBlur.bind(this)}
              value={textAnswer}
              onChange={this.onTextChange}
              spellCheck={isSpellCheck}
            />
            <span className="pte-word-count">
              Word count <span className={curLength > this.props.length ? 'pte-word-count-highlight' : ''}>{curLength}</span>/
              {this.props.length}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
