import { Moment } from 'moment';
import { string } from 'prop-types';

export interface IPteExam {
  id?: number;
  userId?: number;
  result?: string;
  scoreWriting?: number;
  scoreListening?: number;
  scoreReading?: number;
  scoreSpeaking?: number;
  examTypeId?: number;
  email?: string;
  examTypeName?: string;
  status?: string[];
}

export const defaultValue: Readonly<IPteExam> = {};
