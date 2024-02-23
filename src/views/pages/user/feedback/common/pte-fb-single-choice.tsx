
import React from "react";
class FBSingleChoice extends React.Component<any,any> {

  onChange = (e) => {
    let value = e.target.value;
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    const data = this.props.data
    return (
      <div className="form-group">
        <p className="fb-text-question">{data.question}</p>
        {data.choises.map((choise) => (
          <div>
            <div className="custom-control custom-radio">
              <input className="custom-control-input" type="radio" name={`radio_${data.key}`} id={`single_${data.key}_${choise.key}`} value={choise.key} onChange={this.onChange} />
              <label className="custom-control-label" htmlFor={`single_${data.key}_${choise.key}`}>{choise.text}</label>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FBSingleChoice;
