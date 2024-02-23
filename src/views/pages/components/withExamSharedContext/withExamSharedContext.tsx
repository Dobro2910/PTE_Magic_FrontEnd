import React from 'react';
import { ExamSharedConsumer } from 'src/context/exam.context';

export default function withExamSharedContext(...params) {
  // do something with params
  return function HOCFactory<T>(WrappedComponent: any): any {
    let hocClass = class HOC<T> extends React.Component<any, any> {
      render() {
        return WrappedComponent && <ExamSharedConsumer>
           {(context) => (
             <WrappedComponent {...this.props} context={context} />
           )}
         </ExamSharedConsumer>
      }
    };

    return hocClass;
  };
}
