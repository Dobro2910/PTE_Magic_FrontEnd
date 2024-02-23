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

export const LockContent = props => (
    <div className="lock-content">
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'red'}}>Please upgrade to subscription user to view more content!</div>
    </div>
)