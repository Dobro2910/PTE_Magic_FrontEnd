
import React from "react";
// react library for routing
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";
import { Animated } from 'react-animated-css';

// reactstrap components
import {
  Collapse,
  Navbar,
  Nav,
  Button
} from "reactstrap";
import { QUESTION_PACK_NUMBER, EXAM_GROUP, EVENT, ANIMATION_IN, ANIMATION_OUT } from 'src/config/constants';
import { Translate } from 'src/utils/language/translate';
import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers';
import { resetStore, sendEvent, initStore } from 'src/reducers/store';
import { getViewExamLink } from 'src/utils/pte-utils';
import Sidebar from "react-sidebar";
import withExamSharedContext from 'src/views/pages/components/withExamSharedContext';

@connect(
  ({ store }: IRootState) => ({
    event: store.event
  }),
  {
    sendEvent
  }
)
@withExamSharedContext()
class ExamSidebarRight extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      showSidebar: false
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillReceiveProps({ event }) {
    if (event) {
      switch (event) {
        case EVENT.OPEN_RIGHT_SIDEBAR:
          this.props.sendEvent(null);
          this.setState({ showSidebar: true });
          setTimeout(() => this.onSetSidebarOpen(true));
          break;
        default:
          break;
      }
    }
  }
  
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
    setTimeout(() => this.setState({ showSidebar: open }), 1000);
  }

  callback = (i) => {
    const index = i - this.props.context.page * QUESTION_PACK_NUMBER;
    console.log(`call back ${index}`);
    this.props.sendEvent(EVENT.ON_GO_QUESTION, { gotoIndex: index});
    // close sidebar
    this.setState({ sidebarOpen: false });
    setTimeout(() => this.setState({ showSidebar: false }), 1000);
  }

  renderMockList = (index, questionList) => {
    let element = [];

    let count = 0;
    console.log(index);
    if (!questionList) {
      return null;
    }
    
    for (let i = 0; i < questionList.length; i++) {
      if (questionList[i].type !== 'TIME_BREAK' && questionList[i].type !== 'FINISH') {
        element.push(<a key={`item-${count}`} className={ index === i ? 'step-active' : 'step'}>{count + 1}
          { index < i && <i className="fas fa-lock icon-lock"></i>}
          { index > i && <i className="fas fa-check icon-success"></i>}
        </a>);
        count++;
      }
      if (questionList[i].type === 'TIME_BREAK') {
        element.push(<div key={`item-TIME_BREAK-${i}`}><hr className="my-1"/>
          <div className={`grid-icon size-30 icon-tea ${ index != i ? "opacity-5" : ""}`}></div>
          <hr className="my-1"/></div>);
      }
      if (questionList[i].type === 'FINISH') {
        element.push(<div key={`item-FINISH-${i}`}><hr className="my-1"/>
          <div className={`grid-icon size-30 icon-finish ${ index != i ? "opacity-5" : ""}`}></div>
        </div>);
      }
    }

    return element;
  }

  renderQuestionList = (index, page, total) => {
    console.log(index);
    let element = [];
    const from = page * QUESTION_PACK_NUMBER;
    const to = from + QUESTION_PACK_NUMBER;
    const calIndex = index + page * QUESTION_PACK_NUMBER;

    for (let i = from; i < to; i++) {
      if (i < total) {
        // active
        if (calIndex === i) {
          // inactive
            element.push(<a key={`item-${i}`} className={ 'step-active' }>{i + 1}
          </a>);
        } else {
          // inactive
          element.push(<a key={`item-${i}`} className={ 'step'} onClick={() => this.callback(i)}>{i + 1}
            <i className=""></i>
          </a>);
        }
      }
    }

    return element;
  }

  // this function creates the links and collapses that appear in the sidebar (left menu)
  render() {
    const { examGroup, total, type, index, page, question, questions } = this.props.context;
    const scrollBarInner = (
      <div className="scrollbar-inner bg-white" style={{marginLeft: '25px', marginRight: '15px', maxWidth: '200px'}}>
        <div className="navbar-inner">
          <Collapse navbar isOpen={true}>
            <div className="text-center mb-3 mt-3">
              { examGroup === EXAM_GROUP.QUESTION_BANK && <div className="grid-icon size-45 icon-question-bank mr-2"></div> }
              { examGroup === EXAM_GROUP.SCORE_TEST && <div className="grid-icon size-45 icon-ai mr-2"></div> }
              { examGroup === EXAM_GROUP.MOCK_TEST && <div className="grid-icon size-45 icon-question-bank mr-2"></div> }
              { examGroup === EXAM_GROUP.REPEATED_QUESTION && <div className="grid-icon size-45 icon-repeat mr-2"></div> }
            </div>
            <h3 className="text-black text-center">
              <Translate contentKey={'question-group.name.' + examGroup}>QUESTION BANK</Translate> 
            </h3>
            <h5 className="p-0 text-black">
              { (examGroup === EXAM_GROUP.QUESTION_BANK || examGroup === EXAM_GROUP.SCORE_TEST) && (<><Translate contentKey={'question-type.title.' + type}>Title</Translate><div></div></> ) }
              { (examGroup === EXAM_GROUP.MOCK_TEST) && (<>List questions</>) }
            </h5>
            <Nav className="mb-md-3" navbar>
              <div>
                { (examGroup === EXAM_GROUP.QUESTION_BANK || examGroup === EXAM_GROUP.SCORE_TEST || examGroup === EXAM_GROUP.REPEATED_QUESTION) && this.renderQuestionList(index, page, total) }
                { (examGroup === EXAM_GROUP.MOCK_TEST) && this.renderMockList(index, questions) }
              </div>
            </Nav>
            <hr className="my-3" />
            <div className="text-center">
              { examGroup !== EXAM_GROUP.MOCK_TEST && 
                <Link to={ getViewExamLink(examGroup, question, total) } className="text-dark">
                  <Button
                    className="btn-benit-sm btn-benit-default"
                    type="button"
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-angle-left"></i>
                    </span>{ '  ' }
                    <span className="btn-inner--text">Back</span>
                  </Button>
                </Link>
              }
            </div>
            <hr className="my-4" />
          </Collapse>
        </div>
      </div>
    );
    return (
      <>
        { this.state.showSidebar && 
          <Sidebar
            sidebar={ navigator.platform.indexOf("Win") > -1 ? (
              <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
            ) : (
              scrollBarInner
            ) }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
            pullRight
            >
          </Sidebar>
        }
      </>
    );
  }
}

export default ExamSidebarRight;
