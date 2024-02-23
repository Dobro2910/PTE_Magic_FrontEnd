import React from 'react';
import { Route } from 'react-router-dom';
import moment from 'moment';
import { APP_LOCAL_DATETIME_FORMAT, EXAM_GROUP } from '../config/constants';
import _ from 'lodash';
import { isSpeakingQuestion, isWritingQuestion, isListeningQuestion } from './question-utils';
import withTracker from 'src/views/pages/components/withTracker';
import UserRouter from 'src/shared/layouts/router/UserRouter';
import ExamRouter from 'src/shared/layouts/router/ExamRouter';

export const getViewExamLink = (examGroup, question?, total?) => {
  switch (examGroup) {
    case EXAM_GROUP.QUESTION_BANK:
      let link;
      if (isSpeakingQuestion(question)) {
        link = `/platform/user/banks/list_question?total=${total}&type=speaking&question_type=${question.type}`;
      } else if (isWritingQuestion(question)) {
        link = `/platform/user/banks/list_question?total=${total}&type=writing&question_type=${question.type}`;
      } else if (isListeningQuestion(question)) {
        link = `/platform/user/banks/list_question?total=${total}&type=listening&question_type=${question.type}`;
      } else {
        link = `/platform/user/banks/list_question?total=${total}&type=reading&question_type=${question.type}`;
      }
      return link;
    case EXAM_GROUP.MOCK_TEST:
      return '/platform/user/mock_test/list';
    case EXAM_GROUP.SCORE_TEST:
      let type;
      if (question.type === 'SPEAKING_READ_ALOUD') {
        type = `read_aloud`;
      } else if (question.type === 'SPEAKING_REPEAT_SENTENCE') {
        type = `repeat_sentence`;
      }
      return `/platform/user/ai_scoring/${type}`;
    default:
      return '#';
  }
};

export const beep = () => {
  var snd = new Audio(
    'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU='
  );
  if (snd) {
    snd.play();
  }
};

export const randomUuidv4 = () => {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const randomRequestId = () => {
  return 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const removeQueryFbclid = link => {
  if (link === null || link === '' || link == undefined) {
    return link;
  }

  if (_.includes(link, '?fbclid') && _.includes(link, '#')) {
    const first = link.indexOf('?fbclid');
    const last = link.indexOf('#');
    link = link.substring(0, first) + link.substring(last);
  }
  return link;
};

export const convertFlac = (blob, callback) => {
  // https://www.fullstackreact.com/articles/introduction-to-web-workers-with-react/
  let worker = new Worker('content/js/flac_worker/EmsWorkerProxy.js');
  let uuidv4 = randomUuidv4();
  let fr = new FileReader();
  fr.addEventListener('loadend', function() {
    // var encodedName = f.name.replace(/\.[^\.]+$/, '.flac');
    let encodedName = uuidv4 + '.flac';

    // Command line arguments
    // These are strings such as
    // options, input file and output file
    let args = [
      // Input file *name*
      uuidv4
    ];
    // Input file data
    // Object literal mapping
    // file names to Uint8Array
    let inData = {};
    // Remember: We set f.name as input file name
    inData[uuidv4] = new Uint8Array(fr.result as ArrayBuffer);

    // Meta-information about the files
    // that are being created during encoding
    // Currently MIME type only
    let outData = {};
    outData[encodedName] = {
      // Its MIME type
      MIME: 'audio/flac'
    };

    // Finally post all the data to the
    // worker together with the "encode"
    // command.
    worker.postMessage({
      command: 'encode',
      args,
      outData,
      fileData: inData
    });
  });

  // Read the file as ArrayBuffer
  // The FileReader will fire the `loadend`
  // event upon completion.
  fr.readAsArrayBuffer(blob);

  // Listen for messages by the worker
  worker.onmessage = function(e) {
    // If the message is a progress message
    if (e.data && e.data.reply === 'progress') {
      // If the worker is ready
    } else if (e.data && e.data.reply === 'done') {
      for (let fileName in e.data.values) {
        const url = window.URL.createObjectURL(e.data.values[fileName].blob);
        // tslint:disable-next-line
        console.log('Convert Blob:', e.data.values[fileName].blob);
        // tslint:disable-next-line
        console.log(`Flac file, ${url} time: ${moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT)}`);
        callback(url, e.data.values[fileName].blob);
      }
    }
  };
};

export const buildRoutes = routes => {
  let routesTmp = routes;
  routesTmp = routes.map((prop, key) => {
    if (prop.collapse) {
      return buildRoutes(prop.views);
    }
    return (
      <>
        { prop.layout === '/user' && <UserRouter exact {...this.props } path={ prop.layout + prop.path } component={ withTracker(prop.component) } /> }
        { prop.layout === '/exam' && <ExamRouter exact path={ prop.layout + prop.path } component={ withTracker(prop.component) } /> }
      </>
      // <Route
      //   path={prop.layout + prop.path}
      //   component={withTracker(prop.component)}
      //   key={key}
      // />
    );
  });
  console.log(routesTmp)
  return routesTmp;
};