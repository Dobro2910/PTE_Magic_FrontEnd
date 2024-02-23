declare var require: any;
import React from "react";
import {
    Button,
    Card,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";
import { Link } from 'react-router-dom';

export const NewCartPack = props => (
    <div style={{ backgroundColor: 'white'}} className="mb-4">
        {/* <Row className="mb-2">
            <Col md="12">
                <div style={{ fontWeight: 'bold' }}><i className={`cart-header-icon icon-pack-${ props.item.code}`} />{ props.item.name }</div></Col>
            <Col md="12">
                <div className="pack-description">{ props.item.description }</div>
            </Col>
        </Row> */}
        <Row>
        { props.item.packageItems && props.item.packageItems.map((pack, i) => (
                <Col key={`dislay-cart-item-${i}`} md="4" lg="4" sm="6">
                    <Card className="card-product mt-3">
                        <div className="thumbnail"> 
                            <img src= {pack.linkImage} alt="No Image" /> 
                            <div className="thumb-cover" ></div> 
                            <div className="details"> 
                                <div className="numbers"> 
                                    <b className="downloads">
                                        <i className="fa fa-arrow-circle-o-down"></i> { Math.floor(Math.random() * 1001) }</b> <b className="comments-icon">
                                        <i className="fa fa-comment"></i> {Math.floor(Math.random() * 101) }
                                    </b> 
                                </div> 
                                <div className="clearfix"></div> 
                            </div> 
                            <b className="actions">
                                <Link to={`/platform/user/product-detail?id=${pack.id}`} id={`tooltip-pack-detail-${pack.id}`}>
                                    <Button className="btn-benit-sm btn-benit-white mr-2">
                                        <span className="btn-inner--icon mr-1">
                                        <i className="fa fa-align-left" />
                                        </span>
                                        <span className="btn-inner--text hidden-lg-down"></span>
                                    </Button>
                                </Link>
                                <Button className="btn-benit-sm btn-benit-yellow mr-2" id={`tooltip-pack-cart-${pack.id}`}
                                    onClick={ (e) => { props.addCartItem(e, pack) }}>
                                    <span className="btn-inner--icon mr-1">
                                    <i className="fas fa-cart-plus" />
                                    </span>
                                    <span className="btn-inner--text hidden-lg-down"></span>
                                </Button>
                                <UncontrolledTooltip delay={0} target={`tooltip-pack-detail-${pack.id}`}>
                                    View detail
                                </UncontrolledTooltip>
                                <UncontrolledTooltip delay={0} target={`tooltip-pack-cart-${pack.id}`}>
                                    Add to cart
                                </UncontrolledTooltip>
                            </b> 
                        </div> 
                        <div className="card-product-info mt-1 mb--3"> 
                            <h3> {pack.name} 
                                <div className="time pull-right"> 
                                    { pack.oldCost && <span className="line-through strike"> ${pack.oldCost}AUD </span> }
                                    { pack.cost && <span className={`line-through ${pack.oldCost ? 'discount-price' : ''}`}> ${pack.cost}AUD </span> }
                                </div> 
                            </h3>
                            <div className="cart-pack-description">
                                <ul className="list-square mt--1 ml-15" dangerouslySetInnerHTML={{ __html: pack.description }}>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </Col>
            ))
        }
        </Row>
    </div>
)