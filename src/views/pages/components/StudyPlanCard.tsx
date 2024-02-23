declare var require: any;
import React from "react";
import {
    CardImg,
    CardTitle,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    Progress,
    Container,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

export const StudyPlanCard = props => (
    <Card className="bg-gradient-default">
        <CardBody>
            <Row>
            <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0 text-white">
                Day 1
                </CardTitle>
                <span className="h2 font-weight-bold mb-0 text-white">
                <i className="fa fa-arrow-up" /> 40/80
                </span>
            </div>
            <Col className="col-auto">
                <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                <i className="ni ni-active-40" />
                </div>
            </Col>
            </Row>
            <p className="mt-3 mb-0 text-sm">
            <div className="col">
                <small className="text-white">60%</small>
                <Progress
                    className="progress-xs my-2"
                    max="100"
                    value="60"
                    color="success"
                />
            </div>
            <span className="text-nowrap text-light">
                See detail
            </span>
            </p>
        </CardBody>
        </Card>
)