import { IPteQuestion } from './pte-question.model';
import { IPteAnswer } from './pte-answer.model';

export interface IPteAnswerQuestion {
  answer?: IPteAnswer[];
  question?: IPteQuestion;
}

export const defaultValue: Readonly<IPteAnswerQuestion> = {};
