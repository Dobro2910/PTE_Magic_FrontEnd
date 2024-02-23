// originalResult: Dap an
// originalAnswer: Cau tra loi cua thi sinh

// return Xau con chung dai nhat
const getOptimizedAnswer = (originalResult, originalAnswer) => {
  if (!originalResult || !originalAnswer) return [];

  let newResult = originalResult.toLowerCase();
  newResult = replaceWordSpecial(newResult);

  let newAnswer = originalAnswer.toLowerCase();
  newAnswer = replaceWordSpecial(newAnswer);

  const result = newResult.split(" ");
  const answer = newAnswer.split(" ");

  let f = new Array(result.length + 1);
  for (let i = 0; i < f.length; i++) {
    f[i] = new Array(answer.length + 1);
    f[i].fill(0);
  }
  let backtrack = new Array(result.length + 1);
  for (let i = 0; i < f.length; i++) {
    backtrack[i] = new Array(answer.length + 1);
    backtrack[i].fill(0);
  }

  for (let i = 1; i <= result.length; i++) {
    for (let j = 1; j <= answer.length; j++) {
      f[i][j] = f[i - 1][j];
      backtrack[i][j] = [i - 1, j];

      if (f[i][j] < f[i][j - 1]) {
        f[i][j] = f[i][j - 1];
        backtrack[i][j] = [i, j - 1];
      }

      if (result[i - 1] !== answer[j - 1]) {
        continue;
      } else if (f[i][j] < f[i - 1][j - 1] + 1) {
        f[i][j] = f[i - 1][j - 1] + 1;
        backtrack[i][j] = [i - 1, j - 1];
      }
    }
  }

  let final = [];
  let reslen = result.length;
  let anslen = answer.length;

  while (backtrack[reslen][anslen] !== 0) {
    let prevres = backtrack[reslen][anslen][0];
    let prevans = backtrack[reslen][anslen][1];

    if (f[reslen][anslen] > f[prevres][prevans]) {
      final.push(result[reslen - 1]);
    }

    reslen = prevres;
    anslen = prevans;
  }

  final = final.reverse();
  return final;
};

const replaceWordSpecial = (text) => {
  text = text.replace(/\./g, "");
  text = text.replace(/\,/g, "");
  text = text.replace(/\-/g, "");
  text = text.toUpperCase();
  return text;
};

const calculatePronunciation = (originalResult, originalAnswer,content,type) => {
  let finalScoring = analyzeAnswer(originalResult, originalAnswer);
  let correct = 0;
  let wrong = 0;
  let pronunciation = 0;

  if (type == "SPEAKING_RETELL_LECTURE") {
    pronunciation = content + 1/2.9;
    return pronunciation < 5 ? <any>pronunciation.toFixed(1): 5;
  }

  if ( type == "SPEAKING_DESCRIBE_IMAGE") {
    pronunciation = content + 1/1.2;
    pronunciation = (pronunciation + 1/2.9) < 5 ? pronunciation + 1/2.9: 5;
    return pronunciation < 5 ? <any>pronunciation.toFixed(1): 5;
  }

  finalScoring.forEach((element) => {
    if (element.word && element.id === "correct") {
      correct++;
    } else if (element.id === "wrong") {
      wrong++;
    }
  });

  let errorAllowance = ((correct + wrong) / 60) * 0.15;
  if (errorAllowance > 0.15) errorAllowance = 0.15;
  let errorPercentage = wrong / (correct + wrong);

  if (errorPercentage < 0.7 && errorPercentage > 0.4) errorAllowance = errorAllowance * 1.25;
  else if (errorPercentage <= 0.4) errorAllowance = errorAllowance * 0.5;

  if (correct != 0) pronunciation = 5 - (errorPercentage - errorAllowance) * 5;
  if (pronunciation > 5) pronunciation = 5;

  return <any>pronunciation.toFixed(1);
};

const calContentParagraph = (originalResult, originalAnswer) => {
  let finalScoring = analyzeAnswer(originalResult, originalAnswer);
  let correct = 0;
  let missing = 0;

  finalScoring.forEach((element) => {
    if (element.word === "." || element.word === "," || element.word === "-") {
      return;
    }

    if (element.id === "correct") {
      correct++;
    } else if (element.id === "missing") {
      missing++;
    }
  });

  let percentage = (correct / (correct + missing)) * 100;
  return percentage;
};

const calContentKeyword = (text1, text2) => {
  let result = [];
  let arr1 = text1.split(",");

  for (let i = 0; i < arr1.length; i++) {
    if (replaceWordSpecial(text2).includes(replaceWordSpecial(arr1[i])))
      result.push(arr1[i]);
  }

  let percentage = (result.length / arr1.length) * 100;
  return percentage;
};

const calculateFluency = (originalAnswer, time) => {
  console.log(originalAnswer);
  let answer = originalAnswer.split(" ");

  if (answer.length == 0) return 0;
  // if(time > 4) time = time - 3;

  let fluency = 0;
  let wordCount = answer.length;
  let wordsPerSec = wordCount / time;

  if (wordsPerSec >= 2.8) {
    fluency = 5;
  } else if (wordsPerSec < 2.8 && wordsPerSec >= 2.4) {
    fluency = 4.4;
  } else if (wordsPerSec < 2.4 && wordsPerSec >= 2.0) {
    fluency = 3.7;
  } else if (wordsPerSec < 2.0 && wordsPerSec >= 1.8) {
    fluency = 2.5;
  } else {
    fluency = 1.5;
  }

  return fluency;
};

// return array object cua xau ket qua cuoi cung
// word: tu
// id "missing" => mau do
// id "wrong" => mau xam gach ngang
// id "correct" => mau xanh
// * chua swap vi tri 1 so tu mau` do? va mau` xam', neu' swap se~ dep. hon, nhung van~ dung'
const analyzeAnswer = (originalResult, originalAnswer) => {
  let optimizedAnswer = getOptimizedAnswer(originalResult, originalAnswer);
  let resultIndex = 0;
  let answerIndex = 0;
  let optimizedAnswerIndex = 0;
  let finalScoring = [];
  let newResult = originalResult;
  let newAnswer = originalAnswer;

  const result = newResult.split(" ");
  const answer = newAnswer ? newAnswer.split(" ") : [];

  while (optimizedAnswerIndex < optimizedAnswer.length) {
    while (
      resultIndex < result.length &&
      replaceWordSpecial(result[resultIndex]).toLowerCase() !==
        replaceWordSpecial(optimizedAnswer[optimizedAnswerIndex]).toLowerCase()
    ) {
      finalScoring.push({ word: result[resultIndex], id: "missing" });
      resultIndex++;
    }
    resultIndex++;

    while (
      answerIndex < answer.length &&
      replaceWordSpecial(answer[answerIndex]).toLowerCase() !==
        replaceWordSpecial(optimizedAnswer[optimizedAnswerIndex]).toLowerCase()
    ) {
      finalScoring.push({ word: answer[answerIndex], id: "wrong" });
      answerIndex++;
    }
    finalScoring.push({ word: answer[answerIndex], id: "correct" });

    answerIndex++;
    optimizedAnswerIndex++;
  }

  while (resultIndex < result.length) {
    finalScoring.push({ word: result[resultIndex], id: "missing" });
    resultIndex++;
  }

  while (answerIndex < answer.length) {
    finalScoring.push({ word: answer[answerIndex], id: "wrong" });
    answerIndex++;
  }

  return finalScoring;
};

const analyzeKeyword = (text1, text2) => {
  let result = [];
  let arr1 = text1.split(",");

  for (let i = 0; i < arr1.length; i++) {
    if (replaceWordSpecial(text2).includes(replaceWordSpecial(arr1[i])))
      result.push({
        word: arr1[i] + ",",
        id: "correct",
      });
  }
  return result;
};

// -	RS: Không có điểm thập phân, chỉ có 4 mức : 100% = 3/3, >= 50% = 2/3, >= 25% = 1/3, < 25% = 0
// -	RL: Content chấm theo % keyowords nhập, >=80% =5/5, >=65% = 4/5, >=50% = 3/5, >=35% = 2/5, >=20% = 1/5, <20% =0
// -	DI: Content chấm theo % keyowords nhập, >=80% =5/5, >=65% = 4/5, >=50% = 3/5, >=35% = 2/5, >=20% = 1/5, <20% =0
// -	RA: Content chấm theo % keyowords nhập, >=90% =5/5, >=75% = 4/5, >=60% = 3/5, >=45% = 2/5, >=30% = 1/5, <30% =0
// -	ASQ: Không có điểm thập phân, đúng = 1, sai = 0

export const scoring = (originalResult, originalAnswer, duration, type) => {
  
  let finalScoring = [];
  let cp = 0; //content percentage

  if (type == "SPEAKING_RETELL_LECTURE" || type == "SPEAKING_DESCRIBE_IMAGE") {
    finalScoring = analyzeKeyword(originalResult, originalAnswer);
    cp = calContentKeyword(originalResult, originalAnswer);
  } else {
    finalScoring = analyzeAnswer(originalResult, originalAnswer);
    cp = calContentParagraph(originalResult, originalAnswer);
  }

  let content = 0;
  if (type == "SPEAKING_REPEAT_SENTENCE") {
    if (cp == 100) content = 3;
    else if (cp >= 50) content = 2;
    else if (cp >= 25) content = 1;
  } else if (type == "SPEAKING_ANSWER_SHORT_QUESTION") {
    if (cp >= 75) content = 1;
  }else if (type == "SPEAKING_READ_ALOUD") {
    if (cp >= 90) content = 5;
    else if (cp >= 75) content = 4;
    else if (cp >= 60) content = 3;
    else if (cp >= 45) content = 2;
    else if (cp >= 30) content = 1;
  } else {
    if (cp >= 80) content = 5;
    else if (cp >= 65) content = 4;
    else if (cp >= 50) content = 3;
    else if (cp >= 35) content = 2;
    else if (cp >= 20) content = 1;
  }

  let pronunciation = calculatePronunciation(originalResult, originalAnswer,content, type);
  let fluency = calculateFluency(originalAnswer, duration);

  if(content == 0) {
    fluency = 0;
    pronunciation = 0;
  }

  let total = <any>( (Number(content) + Number(fluency) + Number(pronunciation)).toFixed(1));
  return {
    pronunciation: pronunciation,
    data: finalScoring,
    content: content,
    fluency: fluency,
    total: total,
  };
};

export const scoringText = (originalResult, originalAnswer) => {
  let finalScoring = analyzeAnswer(originalResult, originalAnswer);
  let content = calContentParagraph(originalResult, originalAnswer);
  return {
    data: finalScoring,
    content: content * 90,
  };
};
