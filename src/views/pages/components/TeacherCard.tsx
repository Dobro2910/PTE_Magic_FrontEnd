declare var require: any;
import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Badge
  } from "reactstrap";
import { AVATAR_DEFAULT } from '../../../config/constants';

export const TeacherCard = props => (
    <Card className="card-profile mt-75">
        <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
            <div className="card-profile-image card-top-student-image">
                <img
                    alt="..."
                    className=""
                    src={ props.data.avatar || AVATAR_DEFAULT }
                />
            </div>
            </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
        </CardHeader>
        <CardBody className="pt-65">
            <div className="text-center">
            <h5 className="h3">
                { props.data.name }
                <span className="font-weight-light">, { props.data.job_title }</span>
            </h5>
            {props.data.description.map((item, i) => (
                <ul className="list-unstyled list-unstyled-teacher" key={`teacher-card-${i}`}>
                    <li className="">
                        <div className="d-flex align-items-center">
                            <div>
                            <Badge className="badge-circle mr-3" color="info">
                                <i className="ni ni-check-bold" />
                            </Badge>
                            </div>
                            <div>
                            <div className="h5 font-weight-300 title-ellipsis-1">
                                {item}
                            </div>
                            </div>
                        </div>
                    </li>
                </ul>
            ))
            }
            </div>
        </CardBody>
        </Card>
)