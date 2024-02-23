import React from 'react';
import { Translate } from 'src/utils/language/translate';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { EXAM_GROUP } from 'src/config/constants';
import { getViewExamLink } from 'src/utils/pte-utils';

const refreshPage = (e, examGroup, question, total?) => {
  e.preventDefault();
  const link = getViewExamLink(examGroup, question, total);
  console.log(link);
  window.location.replace(link);
  setTimeout(() => window.location.reload(), 1000);
};

export const ExamNav = props => (
  <div className="pte-test-type-question">
    <div className="container">
      <ul className="margin-0 pte-display-inline-block">
        <li>
          <Link to={getViewExamLink(props.examGroup)} className="color-label">
            <Translate contentKey={'question-group.name.' + props.examGroup}>Question bank</Translate>
          </Link>
        </li>
      </ul>
      <div className="pull-right">
        <div className="pte-test-type-question-three-background ">
          <span>
          </span>
        </div>
      </div>
    </div>
  </div>
);
export const ExamCountdownNav = props => (
  <Link onClick={e => refreshPage(e, props.examGroup, props.question)} to="#" className="color-label">
    <Translate contentKey={'question-group.name.' + props.examGroup}>Question bank</Translate>
  </Link>
);

export const ExamGroupTitleNav = props => (
  // <div onClick={e => refreshPage(e, props.examGroup, props.question, props.total)} style={{ cursor: 'pointer', display: 'inline-block'}}  >
  //   <Translate contentKey={'question-group.name.' + props.examGroup}>Question bank</Translate>
  // </div>
  // TODO: need refresh
  <Link to={ getViewExamLink(props.examGroup, props.question, props.total) } className="text-dark">
    <Translate contentKey={'question-group.name.' + props.examGroup}>Question bank</Translate>
  </Link>
);

export const ExamNavItem = props => (
  <div className="pte-test-type-question-two">
    <div className="container">
      <div className="col-md-12">
        <p className="pte-test-type-question-two-title">
          <ExamGroupTitleNav examGroup={EXAM_GROUP.MOCK_TEST} question={props.question} />
          <span>&nbsp;&nbsp;<i className="fas fa-angle-right"></i>&nbsp;&nbsp;</span>
          {props.questionType && <Translate contentKey={'question-type.title.' + props.question.type}>Title</Translate>}
          <span className="hide">{props.questionType}</span>
          { props.examGroup === EXAM_GROUP.MOCK_TEST &&
          props.question.questionType !== 'TIME_BREAK' &&
          props.question.questionType !== 'FINISH' ? (
            <span>
              &nbsp;&nbsp;&nbsp;
              {props.index}/{props.total}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  </div>
);

export const QuestionDescription = props => {
  return <div className="col-md-12 pte-margin-bottom-10 ng-scope">
      <p className="pte-test-type-question-two-des-down">
        <Translate contentKey={'question-type.description.' + props.questionType}>Description</Translate>
      </p>
  </div>
}

export const QuestionBankExamAction = props => (
  <div>
    <Button className="pte-btn-login" type="submit">
      Answer
    </Button>
    <Button className="pte-btn-login" type="submit">
      Next
    </Button>
  </div>
);

export const ExamAction = props => (
  <div className="text-right">
    {props.examGroup === EXAM_GROUP.QUESTION_BANK ? (
      <Button className="pte-btn-login" type="submit">
        Answer
      </Button>
    ) : null}
    <Button className="pte-btn-login" type="button" onClick={() => props.handlerCompleted()}>
      Next
    </Button>
  </div>
);
