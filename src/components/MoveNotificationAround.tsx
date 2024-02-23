import React from 'react'
import Ticker from 'react-ticker'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Container,
    Row,
    Col
  } from "reactstrap";

function rand(min, max) {
    var offset = min
    var range = (max - min) + 1
    var randomNumber = Math.floor(Math.random() * range) + offset
    return randomNumber
  }

const quotes = [
    //'Checkout our new Mock Test 4 and Mock Test 5 <div class="ticker-icon icon-celebrate"></div><div class="ticker-icon icon-celebrate"></div><div class="ticker-icon icon-celebrate"></div> &nbsp;&nbsp;&nbsp;&nbsp;',
    //'Christmas is coming to town <div class="ticker-icon icon-santa"></div>.&nbsp;&nbsp;&nbsp;&nbsp;',
  ]

const MoveNotificationAround = () => (
    <Container className="mt-1 bg-white text-default" fluid >
        <Ticker
            offset="50%"
        >
            {(index) => (
            <span dangerouslySetInnerHTML={{ __html: quotes[rand(0, quotes.length - 1)] }} />
            )}
        </Ticker>
    </Container>
)
 
export default MoveNotificationAround