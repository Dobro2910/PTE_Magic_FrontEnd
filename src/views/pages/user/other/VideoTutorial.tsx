
import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import VideoPlayer from '../../../../components/VideoPlayer/VideoPlayer';
import connect from 'redux-connect-decorator';
import { LockContent } from '../../components/LockContent';
import BenitHeader from 'src/components/Headers/BenitHeader';
import tutorials from 'src/assets/data/video_tutorials.json';
import YouTube from 'react-youtube';

// @connect(
//   state => ({
//     tutorials: state.tutorial.tutorials,
//     loading: state.tutorial.loading,
//     isFreeUser: isFreeUser(state.auth.user.authorities),
//     user: state.auth.user
//   }),
//   {
//     getTutorials,
//     getUserInfo
//   }
// )
class VideoTutorial extends React.Component<any, any> {
  state = {
    // video: {
    //     src: "https://s3-ap-southeast-2.amazonaws.com/cclmagic.com.au/video_1.mp4",
    //     poster: "https://s3-ap-southeast-2.amazonaws.com/cclmagic.com.au/video_1.png"
    // }
  }

  componentDidMount() {
    // this.props.getTutorials();
    // this.props.getUserInfo();
  }

  render() {
    const opts = {
      width: '100%'
    };

    return (
      <>
        <BenitHeader name="Video Tutorial" parentName="Home" />
        <Container className="mt--6 lock-container" fluid>
          <Row className="card-wrapper">
            {/* { isFreeUser && <LockContent /> } */}
            {tutorials && tutorials.map((item, i) => (
              <Col lg="6" key={`col-video-player-${i}`}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3" tag="h3">
                      { item.title }
                    </CardTitle>
                    <div className="mb-4">
                      {/* <VideoPlayer key={`video-player-${i}`} {...item} /> */}
                      <YouTube
                        videoId= { item.youtube_id }
                        opts={opts}
                        // onReady={this._onReady}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default VideoTutorial;
