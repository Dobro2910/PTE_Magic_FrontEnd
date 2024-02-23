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

export const BannerImage = props => (
    <div>
        <div className="text-center">
            <img width="100%" src={ props.link } alt= { props.name } /> 
        </div>
    </div>
)