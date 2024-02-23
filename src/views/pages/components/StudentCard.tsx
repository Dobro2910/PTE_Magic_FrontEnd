declare var require: any;
import React from "react";
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

export const StudentCard = props => (
    <div style={{ margin: '10px'}}>
        <Card>
            <CardBody>
                <div className="text-center">
                    <img
                        alt="..."
                        className="img-center img-fluid shadow shadow-lg--hover"
                        src={require("assets/img/icons/quote-left.png")}
                        style={{ width: "32px" }}
                    />
                </div>
                <div className="pt-1 text-center">
                    <h5 className="title title-ellipsis">
                        <span className="d-block mb-1">{ props.content }</span>
                    </h5>
                </div>
                <div className="pt-3">
                    <a href="#pablo">
                    <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={ props.student_avatar }
                        style={{ width: "70px" }}
                    />
                    </a>
                    <div className="pt-2 text-center">
                        <h5 className="h5 title">
                            <span className="d-block mb-1"> { props.student_name } </span>
                            <small className="h5 font-weight-light text-muted">
                            Student
                            </small>
                        </h5>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
)