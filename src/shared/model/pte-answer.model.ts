import { Moment } from 'moment';

export interface IPteAnswer {
  id?: number;
  examId?: number;
  questionId?: number;
  answer?: string;
  audioLink?: string;
  description?: string;
  status?: string;
  score?: string;
  transcript?: string;
  markedTranscript?: string;
  confidence?: number;
  content?: number;
  pronunciation?: number;
  form?: number;
  grammar?: number;
  vocabulary?: number;
  spelling?: number;
  structure?: number;
  generalInput?: number;
  fluency?: number;
  totalScore?: number;
  maxTotalScore?: number;
  questionType?: string;
  currentQuestion?: number,
  remainTime?: number;
}

export const defaultAnswerValue: Readonly<IPteAnswer> = {};
