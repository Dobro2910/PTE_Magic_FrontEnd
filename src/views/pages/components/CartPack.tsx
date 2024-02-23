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
    Form,
    UncontrolledTooltip
  } from "reactstrap";

export const CartPack = props => (
    <>
        <Col lg= { props.size }>
            <Card>
            <CardBody>
                <Row>
                <div className="col">
                    <CardTitle className="h2 mb-0">
                    { props.item.name }
                    </CardTitle>
                    <small className="text-muted">
                    { props.item.startFrom }
                    </small>
                </div>
                <Col className="col-auto">
                    <div className={`grid-icon icon-pack-${ props.item.code }`}></div>
                </Col>
                </Row>
                <CardText className="">
                    <span className="text-default">{ props.item.description }</span>
                </CardText>
                <div className="col">
                <hr className="my-3" />
                    <Row>
                    <Form style={{ width: '100%'}} className="text-gray">
                        { props.item.packageItems && props.item.packageItems.map((pack, i) => (
                            <div key={ `packageItems-no-${i}` } className="custom-control custom-checkbox mb-4">
                                <input
                                    className="custom-control-input"
                                    id= { `pack-${pack.id}` }
                                    type="checkbox"
                                    disabled= { props.disabled }
                                    name={ `${props.item.code}-${pack.id}` }
                                />
                                <label className="custom-control-label" htmlFor={ `pack-${pack.id}` } >
                                    <div className="cost-container">
                                        <span style={{ textDecoration: 'line-through'}}>
                                            <span style={{ fontWeight: 'bold'}} className="text-gray top--2">${pack.oldCost}AUD</span>
                                        </span>
                                        <span className="label-cost text-red top0">{' '}${pack.cost}AUD</span> 
                                        <strong>{' '}{ pack.name }</strong>
                                    </div>
                                    <ul className="list-square mt--3 ml-15" dangerouslySetInnerHTML={{ __html: pack.description }}>
                                    </ul>
                                </label>
                            </div>
                        ))
                        }
                        { !props.disabled && <Button
                                block
                                className="btn-benit-sm btn-benit-yellow"
                                onClick={ (e) => {
                                    props.addCart(e, props.item)
                                }}>
                                Add to cart
                            </Button>
                        }
                        </Form>
                    </Row>
                </div>
            </CardBody>
            </Card>
        </Col>
    </>
)