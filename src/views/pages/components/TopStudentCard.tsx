declare var require: any;
import React from "react";
import {
    CardImg,
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

export const TopStudentCard = props => (
    <Card className="card-profile mt-75">
        <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
            <div className="card-profile-image card-top-student-image">
                <a href="#" onClick={e => e.preventDefault()}>
                <img
                    alt="..."
                    className=""
                    src={ props.link }
                />
                </a>
            </div>
            </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
        </CardHeader>
        <CardBody className="pt-65">
            <div className="text-center">
            <h5 className="h3">
                { props.name }
                <span className="font-weight-light"></span>
            </h5>
            <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
                Exam Date : 31/07/2019
            </div>
            </div>
        </CardBody>
        </Card>
)