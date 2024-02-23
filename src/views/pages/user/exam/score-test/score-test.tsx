import React from 'react';
import _ from 'lodash';
import connect from 'redux-connect-decorator';
import { Button, Col, Row, Table } from 'reactstrap';
import { IRootState } from 'src/reducers';
import { getQuestionByType, resetQuestion, getQuestionByTypeAsync } from 'src/reducers/question';
import { QuestionDescription, ExamGroupTitleNav } from '../exam-components';
import queryString from 'query-string';
import QuestionLayout from '../question-layout';
import { EXAM_GROUP, QUESTION_PACK_NUMBER, EVENT, AI_QUESTION_TYPES } from 'src/config/constants';
import { PteLoadingSpinner } from '../../../components/LoadingSpinner/pte-loading-spinner';
import { uploadRecorder } from 'src/reducers/exam';
import { Translate } from 'src/utils/language/translate';
import PteActionButton from '../components/common/pte-action-button';
import withUploading from 'src/views/pages/components/withUploading';
import { toast } from 'react-toastify';
import { resetStore, sendEvent, initStore, storedAnswer } from 'src/reducers/store';
import PteAmswer from '../components/common/pte-answer';
import withExamSharedContext from 'src/views/pages/components/withExamSharedContext';
import { getAccessControlList } from 'src/reducers/acl';

export interface IQuestionBankState {
  page: number;
  size: number;
  sort: string;
  type: string;
  isRunning: boolean;
  total: number;
  timeRemaining: number;
  showCountdown: boolean;
  durationTime: number;
  examGroup: string;
  index: number;
  question: any;
  questions: any;
  showAnswer: boolean;
}

@connect(
  ({ question, acl, store }: IRootState) => ({
    questions: question.questions,
    totalItems: question.totalItems,
    acl: acl.acl,
    event: store.event,
    gotoIndex: store.gotoIndex
  }),
  {
    uploadRecorder,
    getQuestionByType,
    sendEvent,
    storedAnswer,
    resetQuestion,
    getAccessControlList
  }
)
@withUploading()
@withExamSharedContext()
export default class ScoreTest extends React.Component<any, IQuestionBankState> {
  constructor(props) {
    super(props);
    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onTimerUpdate = this.onTimerUpdate.bind(this);
    this.onCurrentQuestion = this.onCurrentQuestion.bind(this);

    this.pteAnswerRef = React.createRef();
  }

  state: IQuestionBankState = {
    page: parseInt(queryString.parse(this.props.location.search).page.toString()),
    size: QUESTION_PACK_NUMBER,
    sort: 'id,asc',
    type: queryString.parse(this.props.location.search).type.toString(),
    total: parseInt(queryString.parse(this.props.location.search).total.toString()),
    isRunning: false,
    timeRemaining: 0,
    showCountdown: false,
    durationTime: 0,
    examGroup: EXAM_GROUP.SCORE_TEST,
    index: 0,
    question: null,
    questions: null,
    showAnswer: false
  };

  async componentDidMount() {
    const { page, size, sort, type } = this.state;
    let questions = await getQuestionByTypeAsync(page, size, sort, type);
    if (questions && questions.length > 0) {
      const question = questions[0];
      // console.log(question)
      this.setState({ questions, question, index: 0});
      setTimeout(() => {
        this.props.context.onUpdateShareExamContext({ examGroup: this.state.examGroup,
          type: this.state.type,
          index: this.state.index,
          page: this.state.page,
          total: this.state.total,
          question: question
        });
      });
    }
  }

  pteAnswerRef;

  componentWillReceiveProps({ event, gotoIndex, acl }) {
    if (acl && (acl.numberAiScoring + acl.subscriptionAiScoring === 0)) {
      toast.warn("Limit reached, Buy more Ai Scoring pack to access fully content.", { autoClose: 2000 });
    }

    if (event === EVENT.ON_GO_QUESTION && gotoIndex != null) {
      console.log(`ReceiveProps: ${event}`);
      this.onGotoQuestion(gotoIndex);
    }
  }

  componentDidUpdate() {
    console.log(`componentDidUpdate`);
    if (this.state.showAnswer) {
      // this.pteAnswerRef.scrollTop = this.pteAnswerRef.scrollHeight + 200;
      if (this.pteAnswerRef) {
        this.pteAnswerRef.scrollIntoView(false);
      }
    }
  }

  componentWillUnmount() {
    this.props.resetQuestion();
  }

  onTimerUpdate({ time, duration }) {
    let durationTime = duration - time;
    this.setState({ durationTime });
  }

  onGotoQuestion = (index) => {
    // tslint:disable-next-line
    console.log('onGotoQuestion score ai');
    let question = this.state.questions[index];
    this.setState({ question , index, showAnswer: false });
    // reset
    this.props.sendEvent(null, { googleAnswer: null, audioSrc: null, blob: null, blobRecoder: null });
    this.props.storedAnswer({ question });

    this.props.context.onUpdateShareExamContext({ 
      index,
      question
    });
  };

  onNextQuestion = () => {
    // tslint:disable-next-line
    console.log('onNextQuestion score ai');
    this.onGotoQuestion(this.state.index + 1);
  };

  onBackQuestion = () => {
    // tslint:disable-next-line
    console.log('onBackQuestion score ai');
    this.onGotoQuestion(this.state.index - 1);
  };

  onCurrentQuestion = () => {
    // tslint:disable-next-line
    console.log('onCurrentQuestion');
    this.setState({ question: null });
    setTimeout(
      function() {
        let question = this.state.questions[this.state.index];
        this.setState({ question, showAnswer: false });
      }.bind(this)
    );
  };

  onShowAnswer = () => {
    this.setState({ showAnswer: true});
  }

  renderNavAndDescription = (question, acl) => {
    return (
      <div className="pte-test-type-question-two">
        <div className="container">
          <div className="col-md-12">
            <div className="grid-icon size-30 icon-ai mr-2"></div>
            <div className="pte-test-type-question-two-title">
              <ExamGroupTitleNav examGroup={ this.state.examGroup } total={ this.state.total } question={question} />
              <span>&nbsp;&nbsp;<i className="fas fa-angle-right"></i>&nbsp;&nbsp;</span>
              <Translate contentKey={'question-type.title.' + question.type}>Title</Translate>
              <span className="hide">{question.type}</span>
            </div>
            {
              _.includes(AI_QUESTION_TYPES, question.type) && <div className="btn-benit-sm btn-benit-default benit-timer">
              { acl && <span>
                <i className="fas fa-tag pte-test-type-question-three-icon" />
                <span className="pte-test-type-question-three-timeName">{ `AI SCORE ${acl.numberAiScoring + acl.subscriptionAiScoring}` }</span>
              </span>
              }
            </div>
            }
          </div>
        </div>
      </div>
    );
  };

  onCompletedQuestion = () => {
    this.setState({ showAnswer: false });
    // this.getAnswer();
    this.onNextQuestion();
  };

  onCompletedBackQuestion = () => {
    this.setState({ showAnswer: false });
    // this.getAnswer();
    this.onBackQuestion();
  };
  

  render() {
    const { question, showAnswer } = this.state;
    const { acl } = this.props;

    return (
      <div>
        { question ? 
          <>
            { this.renderNavAndDescription(question, acl) }
            
            <div className="container margin-top30 position-relative"  ref={node => (this.pteAnswerRef = node)} >
              <Col md="12" className="padding0 m-b-70">
                <QuestionDescription questionType={ this.state.type } />
                <QuestionLayout
                  index={this.state.index}
                  page={this.state.page}
                  question={question}
                  examGroup={ this.state.examGroup }
                  onCurrentQuestion={this.onCurrentQuestion}
                  onNextQuestion={this.onNextQuestion}
                  onUploadRecording={this.props.onUploadRecording}
                />
                { showAnswer && <PteAmswer /> }
                <PteActionButton
                  { ...this.props }
                  { ...this.state }
                  handlerCompleted={this.onCompletedQuestion}
                  handlerBackCompleted={this.onCompletedBackQuestion}
                  handlerTryAgain={this.onCurrentQuestion}
                  onShowAnswer={this.onShowAnswer}
                />
              </Col>
            </div>
          </>
          : <PteLoadingSpinner />
        }
      </div>
    );
  }
}
