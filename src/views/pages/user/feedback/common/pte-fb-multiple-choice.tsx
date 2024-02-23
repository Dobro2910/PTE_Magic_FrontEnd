
import React from "react";

class FBMultipleChoice extends React.Component<any,any> {
  state = {
    answers: []
  }

  onChange = (e) => {
    let value = e.target.value;
    let answers = this.state.answers;
    if (answers.includes(value)) {
      let index = answers.findIndex(ans => ans == value);
      answers.splice(index, 1)
    } else answers.push(value);

    this.setState(answers);
    if (this.props.onChange) this.props.onChange(answers.toString())
  }

  render() {
    const data = this.props.data
    return (
      <div className="form-group">
        <p className="fb-text-question">{data.question}</p>
        {data.choises.map((choise) => (
          <div className="custom-control custom-checkbox form-feedback">
            <input className="custom-control-input" id={`choise_${data.key}_${choise.key}`} type="checkbox" value={choise.key} onChange={this.onChange} />
            <label className="custom-control-label" htmlFor={`choise_${data.key}_${choise.key}`}>{choise.text}</label>
          </div>
        ))}
      </div>
    );
  }
}

export default FBMultipleChoice;
