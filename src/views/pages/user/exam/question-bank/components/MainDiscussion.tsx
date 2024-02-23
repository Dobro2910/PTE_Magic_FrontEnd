import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';
import React, { Component } from "react";
// reactstrap components
import { confirmAlert } from 'react-confirm-alert';
// reactstrap components
import {
  Row,
  Col
} from "reactstrap";
// core components
import _ from 'lodash';

// react component for creating dynamic tables
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
const { SearchBar } = Search;
import Discussion from './Discussion';
import ScoreBoard from './ScoreBoard';
import BoardMe from './BoardMe';
import { AI_QUESTION_TYPES } from 'src/config/constants';

class MainDiscussion extends Component<any, any> {

  async componentDidMount() {
  }

  componentWillUnmount() {
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      show_board: false,
      show_discussion: false,
      show_me: true,
      showScoreboard: false
    };
  }

  onChangeTab = (type) => {
    let data = {
        show_board: false,
        show_discussion: false,
        show_me: false,
    }
    switch (type) {
      case "show_board":
        data.show_board = true;
        break;
      case "show_discussion":
        data.show_discussion = true;
        break;
      case "show_me":
        data.show_me = true;
        break;
      default:
        break;
    }
    this.setState({...data});
  }

  toggleShowScoreboard = () => {
    // e.preventDefault();
    // var result = $('#custom-show-scoreboard-question-flag').is(':checked')? true : false;
    // console.log(result)
    this.setState({ showScoreboard: !this.state.showScoreboard });
  }

  render() {
    return (
    <>
      { _.includes(AI_QUESTION_TYPES, this.props.questionType) && 
        <>
          {/* <div className="ant-divider ant-divider-horizontal ant-divider-with-text-left" role="separator">
          </div> */}
          {/* <>
            <div className="mb-3">
              <span className="repeated-label">Show Scoreboard</span>
              <label className="custom-toggle ml-1 custom-toggle-btn">
                <input type="checkbox" id="custom-show-scoreboard-question-flag" 
                // checked = { this.state.showScoreboard }
                onClick={ this.toggleShowScoreboard } 
                />
                <span
                  className="custom-toggle-slider rounded-circle"
                  data-label-off="Off"
                  data-label-on="On"
                />
              </label>
            </div>
          </> */}
          {/* <div className="ant-divider ant-divider-horizontal ant-divider-with-text-left" role="separator">
            <span className="ant-divider-inner-text"><span className="ml-2 mr-2">Score board</span></span>
          </div> */}
          { this.state.showScoreboard && 
          <>
            <Row>
              <Col md="12">
                <div className="text-left">
                  <div className="btn-group btn-group-sm mb-3" role="group" aria-label="Basic example">
                    <button type="button" onClick={ () => { this.onChangeTab('show_me') } }
                      className={ `btn ${this.state.show_me ? "btn-benit-sm btn-benit-yellow" : 'btn-tab'}` }>My Records</button>
                    <button type="button" onClick={ () => { this.onChangeTab('show_board') } }
                      className={ `btn ${this.state.show_board ? "btn-benit-sm btn-benit-yellow" : 'btn-tab'}` }>Score Board</button>
                    {/* <button type="button" onClick={ () => { this.onChangeTab('show_discussion') } }
                      className={ `btn ${this.state.show_discussion ? "btn-benit-sm btn-benit-yellow" : 'btn-tab'}` }>Discussion</button> */}
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                { this.state.show_me && <BoardMe questionId={ this.props.questionId}  /> }
                { this.state.show_board && <ScoreBoard questionId={ this.props.questionId} /> }
                { this.state.show_discussion && <Discussion /> }
              </Col>
            </Row>
          </>
          }
        </>
        }
      </>
    );
  }
}

export default MainDiscussion;
