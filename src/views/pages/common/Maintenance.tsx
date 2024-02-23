import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Button,
  Row
} from "reactstrap";
import BenitHeader from 'src/components/Headers/BenitHeader';

class Maintenance extends Component<any, any> {
  state = {
  };


  componentDidMount() {
  }
  
  componentWillReceiveProps({ acl }) {
  }

  componentWillUnmount() {
    // this.props.reset();
  }

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <div className="text-center mb-3 text-red">
          <span>System maintenance</span>
        </div>
        <div className="text-center">
          <div className="grid-icon size-200 icon-maintenance mb-4">
          </div>
        </div>
      </>
    );
  }
}

export default Maintenance;
