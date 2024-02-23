import React, { Component } from 'react';
import { EXAM_GROUP } from 'src/config/constants';

// examGroup={ this.state.examGroup } type={this.state.type} question = { question }
//               index={this.state.index} page={ this.state.page } total={ this.state.total } 
const defaultContext = {
    examGroup: null,
    type: null,
    index: null,
    page: null,
    total: null,
    question: null,
    questions: null,
    onUpdateShareExamContext: null
};
export const ExamSharedContext = React.createContext(defaultContext);

export class ExamSharedProvider extends Component {
    constructor(props) {
        super(props);
    }

    onUpdateShareExamContext = (data) => {
        console.log(`onUpdateShareExamContext`, data);
        this.setState({ ... data });
    }

    state = {
        examGroup: null,
        type: null,
        index: null,
        page: null,
        total: null,
        question: null,
        questions: null,
        onUpdateShareExamContext: this.onUpdateShareExamContext
    };

  render() {
    const { children } = this.props;

    return (
      <ExamSharedContext.Provider
        value={{ ...this.state }}
      >
        {children}
      </ExamSharedContext.Provider>
    );
  }
}

export const ExamSharedConsumer = ExamSharedContext.Consumer;
