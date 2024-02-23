import { Moment } from 'moment';

export interface IPteQuestion {
  id?: number;
  type?: string;
  text?: string;
  audioLink?: string;
  description?: string;
  answerA?: string;
  answerB?: string;
  answerC?: string;
  answerD?: string;
  answerE?: string;
  expectAnswer?: string;
  active?: boolean;
  answerF?: string;
  answerG?: string;
  answerH?: string;
  answerI?: string;
  answerJ?: string;
  examId?: number;
  timeBreak?: string;
  orderDisplay?: number;
}

export const defaultValue: Readonly<IPteQuestion> = {};
