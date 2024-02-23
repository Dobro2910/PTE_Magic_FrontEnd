import React from 'react';
import { IPteQuestion } from 'src/shared/model/pte-question.model';
import { QUESTION_TYPE } from 'src/config/constants';
import SpeakingRS from './components/speaking-repeat-sentence';
import SpeakingASQ from './components/speaking-answer-short-question';
import SpeakingDI from './components/speaking-describe-image';
import SpeakingRA from './components/speaking-read-aloud';
import SpeakingRL from './components/speaking-retell-lecture';
import WritingE from './components/writing-essay';
import WritingSWT from './components/writing-summarize-written-text';

import FillInTheBlankRW from './components/reading-fib-r-w';
import FillInTheBlankR from './components/reading-fib-r';

import ReadingROP from './components/reading-re-order-paragraph';
import ListeningFIB from './components/listening-fib-l';
import ReadingMCQRMultipleAnswer from './components/reading-mcq-r-multiple-answer';
import ReadingMCQRSingleAnswer from './components/reading-mcq-r-single-answer';
import ListeningDictation from './components/listening-dictation';
import ListeningSingleAnswer from './components/listening-mcq-l-single-answer';
import ListeningMultipleAnswer from './components/listening-mcq-l-multiple-answer';
import ListeningHIW from './components/listening-highlight-incorrect-word';

import ListeningSMT from './components/listening-summarize-spoken-text';
import ListeningSelectMissingAnswer from './components/listening-select-missing-word';
import ListeningHCS from './components/listening-highlight-correct-summary';
import PteFinish from './components/common/pte-finish';
import { PteTimeBreak } from './components/common/pte-time-break';
import { IPteExam } from 'src/shared/model/pte-exam.model';
export interface IQuestionLayoutProps {
  question: IPteQuestion;
  examGroup: string;
  onNextQuestion?: Function;
  exam?: IPteExam;
  onCurrentQuestion?: Function;
  onUploadRecording?: Function;
  onNextQuestionTimebreak?: Function;
  index?: any;
  page?: any;
  remainTime?: any;
}

export interface IQuestionLayoutState {
  url: string;
}

export default class QuestionLayout extends React.Component<IQuestionLayoutProps, IQuestionLayoutState> {
  constructor(props) {
    super(props);
  }

  renderQuestionBankLayout = () => {
    let components = null;
    if (this.props.question == null) {
      return null;
    }

    switch (this.props.question.type) {
      // Speaking
      case QUESTION_TYPE.SPEAKING_READ_ALOUD:
        components = (
          <SpeakingRA
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.SPEAKING_REPEAT_SENTENCE:
        components = (
          <SpeakingRS
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.SPEAKING_DESCRIBE_IMAGE:
        components = (
          <SpeakingDI
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.SPEAKING_ANSWER_SHORT_QUESTION:
        components = (
          <SpeakingASQ
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.SPEAKING_RETELL_LECTURE:
        components = (
          <SpeakingRL
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      // Writing
      case QUESTION_TYPE.WRITING_ESSAY:
        components = (
          <WritingE
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.WRITING_SUMMARIZE_WRITTEN_TEXT:
        components = (
          <WritingSWT
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      // Reading
      case QUESTION_TYPE.READING_RE_ORDER_PARAGRAPH:
        components = (
          <ReadingROP
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.READING_MCQ_R_MULTIPLE_ANSWER:
        components = (
          <ReadingMCQRMultipleAnswer
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.READING_MCQ_R_SINGLE_ANSWER:
        components = (
          <ReadingMCQRSingleAnswer
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.READING_FIB_R_W:
        components = <FillInTheBlankRW {...this.props} key={this.props.question.id} />;
        break;
      case QUESTION_TYPE.READING_FIB_R:
        components = <FillInTheBlankR {...this.props} key={this.props.question.id} />;
        break;
      // Listening
      case QUESTION_TYPE.LISTENING_FIB_L:
        components = (
          <ListeningFIB
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.LISTENING_DICTATION:
        components = (
          <ListeningDictation
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.LISTENING_MCQ_L_SINGLE_ANSWER:
        components = (
          <ListeningSingleAnswer
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.LISTENING_MCQ_L_MULTIPLE_ANSWER:
        components = (
          <ListeningMultipleAnswer
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.LISTENING_SUMMARIZE_SPOKEN_TEXT:
        components = (
          <ListeningSMT
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.LISTENING_SELECT_MISSING_WORD:
        components = (
          <ListeningSelectMissingAnswer
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.LISTENING_HIGHLIGHT_CORRECT_SUMMARY:
        components = (
          <ListeningHCS
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.LISTENING_HIGHLIGHT_INCORRECT_WORD:
        components = (
          <ListeningHIW
            key={this.props.question.id}
            { ...this.props }
          />
        );
        break;
      case QUESTION_TYPE.FINISH:
        components = (
          <PteFinish key={this.props.question.id} examGroup={this.props.examGroup} 
              question={this.props.question} exam={this.props.exam} />
        );
        break;
      case QUESTION_TYPE.TIME_BREAK:
        components = (
          <PteTimeBreak
            key={this.props.question.id}
            onNextQuestionTimebreak={this.props.onNextQuestionTimebreak}
            question={this.props.question}
          />
        );
        break;
      default:
        <div>
          <span>Component not found</span>
        </div>;
        break;
    }

    return components;
  };

  render() {
    let elements = this.renderQuestionBankLayout();
    return <div>{elements}</div>;
  }
}
