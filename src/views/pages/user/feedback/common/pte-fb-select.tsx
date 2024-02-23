
import React from "react";
class FBSelect extends React.Component<any,any> {

  onChange = (e) => {
    let value = e.target.value;
    console.log(value);
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    const data = this.props.data
    return (
      <div className="form-group" >
        <p className="fb-text-question">{data.question}</p>
        <select className="form-control" id={`select_${data.key}`} style={{ maxWidth: 400 }} onChange={this.onChange}>
          {data.choises.map((choise) => (
            <option value={choise.key}>{choise.text}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default FBSelect;
