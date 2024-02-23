import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import Slider from "react-slick";
import { StudentCard } from '../../views/pages/components/StudentCard';
import studentTestimonials from 'src/assets/data/testimonial.json';

class StudentTestimonial extends Component<any, any> {

  componentDidMount() {
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <>
        <section className="py-4">
          <Container>
            <Row className="row-grid align-items-center">
                <Col md="12">
                  <div className="pr-md-5 text-uppercase">
                    <h1>Student Testimonial</h1>
                  </div>
                </Col>
            </Row>
            <div>
              { studentTestimonials && <Slider {...settings}>
                {studentTestimonials.map((item, i) => (
                  <div key={`student-testimonial-${i}`}> 
                    <StudentCard {...item} />
                  </div>
                ))
                }
              </Slider>
              }
            </div>
            <Row className="row-grid align-items-center">
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <a className="font-weight-bold text-warning mt-5"
                    href="#" target="_blank"
                  >
                    Xem thêm ...
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
          </section>
      </>
    )
  }
}

export default StudentTestimonial;
