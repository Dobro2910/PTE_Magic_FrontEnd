import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { uploadRecording, logWarningMessage, uploadPoolRemove, uploadPoolAdd } from 'src/utils/upload-utils';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { randomRequestId } from 'src/utils/pte-utils';

export default function withUploading(...params) {
  // do something with params
  return function HOCFactory<T>(WrappedComponent: any): any {
    let hocClass = class HOC<T> extends React.Component<any, any> {
      state = {
        isBackToQuestionBank: false
      };

      onUploadRecording = async (questionId: number, filename: string, blob: Blob, apiGoogle?: boolean, index?: any, page?: any) => {
        uploadPoolAdd(filename);
        // tslint:disable-next-line
        console.log('withUploading onUploadRecording');
        // let result = await this.props.uploadRecorder(filename, blob);
        let result = await uploadRecording(filename, blob);
        if (result.status !== 200) {
          // tslint:disable-next-line
          console.log(`Upload error ${result.status}, ${result.statusText}`);
          return null;
        }
        // Remove pool
        uploadPoolRemove(filename);

        // call answer recognition
        if (apiGoogle) {
          try {
            let res = await axios.post(`api/answer/recognition`, {
              audioLink: result.url,
              questionId: questionId,
              requestId: `${randomRequestId()}-${questionId}-${new Date().getTime()}`,
              packInfo: `#${index + 1} (Package ${page + 1})`
            });
            // tslint:disable-next-line
            return res.data;
          } catch (error) {
            let warnMessage = 'Error has occurred when recognition.';
            toast.error(warnMessage);
            logWarningMessage(`recognition ${result.url} fail`, JSON.stringify(error));
            this.setState({ isBackToQuestionBank: true });
          }

          return null;
        }
        return result;
      };

      render() {
        const { isBackToQuestionBank } = this.state;
        if (isBackToQuestionBank === true) {
          return <Redirect to="/view-exam/score-test" />;
        }

        return <WrappedComponent {...this.props} onUploadRecording={this.onUploadRecording} />;
      }
    };

    return hocClass;
  };
}
