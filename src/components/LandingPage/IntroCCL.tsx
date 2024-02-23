import React, { Component } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";
import ReactPlayer from 'react-player';

class IntroCCL extends Component<any, any> {

  
  render() {
    return (
      <>
        <section className="py-4 bg-landing1 text-white">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <div className='player-wrapper'>
                    <ReactPlayer
                      className='react-player'
                      url='https://www.youtube.com/watch?v=fCnrfdV8F28'
                      width='100%'
                      height='100%'
                    />
                  </div>
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h1>Giới thiệu Bài thi PTE MAGIC</h1>
                    <p>
                    PTE MAGIC, sự lựa chọn hàng đầu khi bạn đang tìm kiếm Khoá luyện thi PTE hiệu quả, thời gian học linh động và chi phí thật hợp lí.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
      </>
    )
  }
}

export default IntroCCL;
