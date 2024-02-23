
import React, { Component } from "react";
// reactstrap components
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Button,
  Media,
  UncontrolledTooltip,
  Progress,
  Row
} from "reactstrap";
// core components
import SimpleHeader from "../../../../components/Headers/SimpleHeader";

// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { StudyPlanCard } from '../../components/StudyPlanCard';


class StudyPlan extends Component<any, any> {
  componentDidMount() {
  }

  render() {
    const { data, loading } = this.props;
    
    return (
      <>
        <SimpleHeader name="Study Plan" parentName="Home" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
            <div className="col col-3">
              <StudyPlanCard />
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default StudyPlan;
