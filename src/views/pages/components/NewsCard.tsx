declare var require: any;
import React from "react";
import {
    Badge,
    Button,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

export const NewsCard = props => (
    <div style={{ margin: '10px'}}>
        <Card>
            <CardImg
                alt="..."
                src={ props.img_url }
                top
            />
            <CardBody>
                {/* <CardTitle className="h2 mb-0">
                { props.title }
                </CardTitle> */}
                <small className="text-muted">
                    on Oct 29th at 10:23 AM
                </small>
                <CardText className="mt-4 title-ellipsis-news">
                    { props.title }
                </CardText>
                <a className="px-0"
                    color="link"
                    href={props.news_link}
                    target="_blank"
                >
                Xem thêm
                </a>
            </CardBody>
        </Card>
    </div>
)