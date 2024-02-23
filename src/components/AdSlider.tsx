import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import React, { Component } from "react";
import Slider from "react-slick";
import banners from 'src/assets/data/banners.json';
import testimonials from 'src/assets/data/testimonial.json';
import { BannerCard } from 'src/views/pages/components/BannerCard';

class AdSlider extends Component<any, any> {

  componentDidMount() {
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: "linear"
    };

    return (
      <>
        <Container style={{paddingBottom: '3rem'}}>
          <div>
            { banners && <Slider {...settings}>
              {banners.map((item, i) => (
                <div key={`banner-${i}`}> 
                  <BannerCard {...item} />
                </div>
              ))
              }
            </Slider>
            }
          </div>
        </Container>
      </>
    )
  }
}

export default AdSlider;
