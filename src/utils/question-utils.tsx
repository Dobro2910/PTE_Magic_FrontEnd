export const isSpeakingQuestion = (question) => {
  if (question.type.indexOf('SPEAKING_') !== -1) {
    return true;
  }
  return false;
};

export const isWritingQuestion = (question) => {
  if (question.type.indexOf('WRITING_') !== -1) {
    return true;
  }
  return false;
};

export const isReadingQuestion = (question) => {
  if (question.type.indexOf('READING_') !== -1) {
    return true;
  }
  return false;
};

export const isListeningQuestion = (question) => {
  if (question.type.indexOf('LISTENING_') !== -1) {
    return true;
  }
  return false;
};

export const isTimebreakQuestion = (question) => {
  if (question.type.indexOf('TIME_BREAK') !== -1) {
    return true;
  }
  return false;
};

export const isNewPartListening = (preQuestion, currentQuestion) => {
  let isNewPart = false;
  if (currentQuestion.type.indexOf('LISTENING_SUMMARIZE_SPOKEN_TEXT') !== -1) {
    return true;
  }

  if ((isTimebreakQuestion(preQuestion) || preQuestion.type === 'LISTENING_SUMMARIZE_SPOKEN_TEXT')
    && currentQuestion.type !== 'LISTENING_SUMMARIZE_SPOKEN_TEXT') {
      return true;
  }

  return isNewPart;
};


export const orderQuestionType = (type, data) => {
  let orderData = [];
  switch (type) {
    case "speaking":
      let ra = data.filter(item => {
        return item.type === 'SPEAKING_READ_ALOUD';
      });
      ra && ra.length > 0 ? orderData.push(ra[0]) : null;

      let rs = data.filter(item => {
        return item.type === 'SPEAKING_REPEAT_SENTENCE';
      });
      rs && rs.length > 0 ? orderData.push(rs[0]) : null;

      let di = data.filter(item => {
        return item.type === 'SPEAKING_DESCRIBE_IMAGE';
      });
      di && di.length > 0 ? orderData.push(di[0]) : null;

      let rl = data.filter(item => {
        return item.type === 'SPEAKING_RETELL_LECTURE';
      });
      rl && rl.length > 0 ? orderData.push(rl[0]) : null;

      let asq = data.filter(item => {
        return item.type === 'SPEAKING_ANSWER_SHORT_QUESTION';
      });
      asq && asq.length > 0 ? orderData.push(asq[0]) : null;
      break;
    default:
      orderData = data;
      break;
  }

  return orderData;
}