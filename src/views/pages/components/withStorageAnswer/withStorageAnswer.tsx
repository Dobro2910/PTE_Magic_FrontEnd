import React from 'react';
import { toast } from 'react-toastify';
import { EXAM_GROUP } from 'src/config/constants';
import { IPteAnswer } from 'src/shared/model/pte-answer.model';
import { connect } from 'react-redux';
import { IRootState } from 'src/reducers';
import { saveAnswer } from 'src/reducers/exam';
import { storedAnswer } from 'src/reducers/store';
import { isSpeakingQuestion } from 'src/utils/question-utils';
import axios from 'axios';

const mapStateToProps = ({ exam }: IRootState) => ({
  saveAnswerEntity: exam.answer
});

const mapDispatchToProps = {
  storedAnswer,
  saveAnswer
};

const logWarningMessage = (props, message) => {
  // Get signed_url
  const data = {
    examId: props.exam.id,
    questionId: props.question.id,
    questionType: props.question.type,
    message
  };
  axios.post('api/log/log-answer', data);
};

export default function withStorageAnswer(...params) {
  // do something with params
  return function HOCFactory<T>(WrappedComponent: any): any {
    let hocClass = class HOC<T> extends React.Component<any, any> {
      storageAnswer = async data => {
        if (this.props.examGroup === EXAM_GROUP.MOCK_TEST) {
          if (data.answer == null || data.answer === '') {
            const message = 'You skip this question. No save the answer.';
            toast.warn(message, { autoClose: 2000 });
            logWarningMessage(this.props, message);
            return;
          }

          // Upload recording if speaking group
          if (isSpeakingQuestion(this.props.question)) {
            const filename = data.answer;
            let resultUpload = await this.props.onUploadRecording(this.props.question.id, filename, data.blob, false);
            data.audioLink = filename;
            // data.answer = filename;
          }

          const entity: IPteAnswer = {
            ...data,
            examId: this.props.exam.id,
            questionId: this.props.question.id,
            // audioLink: data.answer,
            questionType: this.props.question.type,
            // currentQuestion: this.props.index,
            // remainTime: this.props.remainTime,
            status: 'MARKING'
          };
          // console.log(`save current index: ${this.props.index}`);
          this.props.saveAnswer(entity);
        }

        // store redux
        if (this.props.examGroup === EXAM_GROUP.QUESTION_BANK || this.props.examGroup === EXAM_GROUP.SCORE_TEST
          || this.props.examGroup === EXAM_GROUP.REPEATED_QUESTION ) {
          // redux store
          this.props.storedAnswer({ ...data, question: this.props.question });
        }

        // log question bank
        if (this.props.examGroup === EXAM_GROUP.QUESTION_BANK || this.props.examGroup === EXAM_GROUP.REPEATED_QUESTION ) {
          // Get signed_url
          const logObj = {
            answer: data.answer,
            questionId: this.props.question.id,
            questionType: this.props.question.type,
            examGroup: EXAM_GROUP.QUESTION_BANK
          };
          axios.post('api/log/log-question-bank', logObj);
        }
      };

      render() {
        return <WrappedComponent {...this.props} storageAnswer={this.storageAnswer} />;
      }
    };

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(hocClass);
  };
}
