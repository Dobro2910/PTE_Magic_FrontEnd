import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { uploadRecording, logWarningMessage, uploadPoolRemove, uploadPoolAdd } from 'src/utils/upload-utils';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExamSidebarRight from 'src/components/Sidebar/ExamSidebarRight';

export default function withExamSidebar(...params) {
  // do something with params
  return function HOCFactory<T>(WrappedComponent: any): any {
    let hocClass = class HOC<T> extends React.Component<any, any> {
      state = {
        show: true
      };

      componentDidMount() {
        if (window.innerWidth < 1200) {
          this.setState({ show: false });
        }
      }

      render() {
        return (
          <>
            <WrappedComponent {...this.props} />
            { this.state.show && <ExamSidebarRight {...this.props} /> }
          </>
        )
      }
    };

    return hocClass;
  };
}
