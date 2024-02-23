declare var require: any;
import React from "react";
import {
    Card,
    CardBody,
    Col,
    UncontrolledTooltip
  } from "reactstrap";
import YouTube from 'react-youtube';
import VideoPlayer from 'src/components/VideoPlayer/VideoPlayer';

const opts = {
    width: '100%',
    height: '100%'
};

const video = {
    video_link : "https://s3-ap-southeast-2.amazonaws.com/ptemagic.io/event_20000_users.mp4",
    type : "video/mp4"
}

export const BannerYoutube = props => (
    <>
        <Col md="12" lg="12">
            <div className="auto-video mb-3">
                <VideoPlayer {...video} />
            </div>
        </Col>
    </>
)