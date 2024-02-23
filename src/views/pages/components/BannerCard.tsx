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

export const BannerCard = props => (
    <div>
        <Card>
            <CardBody>
                <div className="text-center">
                    <img
                        alt="..."
                        className="img-center img-fluid shadow shadow-lg--hover img-banner"
                        src={props.link}
                    />
                </div>
            </CardBody>
        </Card>
    </div>
)