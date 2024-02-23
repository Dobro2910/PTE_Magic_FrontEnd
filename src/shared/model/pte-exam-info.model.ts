import { IPteExam } from './pte-exam.model';
import { IPteExamType } from './pte-exam-type.model';
import { IPteQuestion } from './pte-question.model';
import { IPteAnswer } from './pte-answer.model';
import { IPteAnswerQuestion } from './pte-answer-question.model';

export interface IPteExamInfo {
  examTypeId?: number;

  examDTO?: IPteExam;
  examTypeDTO?: IPteExamType;
  questions?: IPteQuestion[];
  answers?: IPteAnswer[];
  answerQuestions?: IPteAnswerQuestion[];
  numberQuestionReading?: number;
  numberQuestionWriting?: number;
  numberQuestionListening?: number;
  numberQuestionSpeaking?: number;
}

export const defaultValue: Readonly<IPteExamInfo> = {};
