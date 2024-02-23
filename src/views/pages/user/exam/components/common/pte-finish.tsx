import React from 'react';
import { IPteQuestion } from 'src/shared/model/pte-question.model';
import { EXAM_GROUP, ANIMATION_IN, ANIMATION_OUT, EVENT } from 'src/config/constants';
import { finishExam, resetExam } from 'src/reducers/exam';
import { IPteExam } from 'src/shared/model/pte-exam.model';
import { Animated } from 'react-animated-css';
import { sendEvent } from 'src/reducers/store';
import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers';

export interface IPteFinishState {}

export interface IPteFinishProps extends StateProps, DispatchProps {
  question?: IPteQuestion;
  examGroup: string;
  exam?: IPteExam;
}

@connect(
  ({ store }: IRootState) => ({
    event: store.event
  }),
  {
    sendEvent
  }
)
export class PteFinish extends React.Component<any, IPteFinishState> {
  constructor(props) {
    super(props);
  }

  state = {};

  componentWillReceiveProps({ event }) {
    if (event) {
      switch (event) {
        case EVENT.ON_EXAM:
          this.props.sendEvent(null);
          break;
        default:
          break;
      }
    }
  }
  
  componentDidMount() {
    if (this.props.examGroup === EXAM_GROUP.MOCK_TEST) {
      const entity = {
        id: this.props.exam.id
      };
      this.props.finishExam(entity);
    }
  }

  render() {
    return (
      <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
        <div className="text-center">
          <div className="grid-icon size-200 icon-finish mb-4">
          </div>
        </div>
      </Animated>
    );
  }
}

export const mapStateToProps = ({ exam }: IRootState) => ({});

export const mapDispatchToProps = {
  finishExam,
  resetExam
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PteFinish);
