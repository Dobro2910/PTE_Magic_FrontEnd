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


export default function withTrackingQuestion(...params) {
  // do something with params
  return function HOCFactory<T>(WrappedComponent: any): any {
    let hocClass = class HOC<T> extends React.Component<any, any> {

      async componentDidMount() {
        console.log(`withTrackingQuestion did mount`);
        let data = {
          examGroup : this.props.examGroup,
          questionType : this.props.question.type,
          questionId: this.props.question.id
        };
        axios.post('api/track_question/add', data);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(hocClass);
  };
}
