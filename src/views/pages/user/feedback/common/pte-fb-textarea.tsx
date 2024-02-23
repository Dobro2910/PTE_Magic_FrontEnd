import React from "react";
class FBTextarea extends React.Component<any, any> {
  state = {
    status,
    textAnswer: '',
    curLength: 0
  };

  onTextChange = (e) => {
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
    if (this.props.onChange) this.props.onChange(newTextAnswer); 
  }

  isAlphabet(character) {
    var numeric_char = character.charCodeAt(character);
    if (numeric_char > 64 && numeric_char < 91) return true;
    if (numeric_char > 96 && numeric_char < 123) return true;
    return false;
  }

  render() {
    const data = this.props.data;
    const { textAnswer, curLength } = this.state;
    return (
      <div className="form-group">
        <p className="fb-text-question">{data.question}</p>
        <textarea
          className="form-control"
          rows={10}
          placeholder="Writing at here" 
          value={textAnswer}
          onChange={this.onTextChange} 
        ></textarea>
        <span className="pte-word-count">
          Word count{" "}
          <span
            className={
              curLength > this.props.length ? "pte-word-count-highlight" : ""
            }
          >
            {curLength}
          </span>
          /{this.props.length}
        </span>
      </div>
    );
  }
}

export default FBTextarea;
