import { Moment } from 'moment';

export interface IPteExamType {
  id?: number;
  name?: string;
  type?: string;
  totalQuestion?: number;
  description?: string;
  numQuestion1?: number;
  numQuestion2?: number;
  numQuestion3?: number;
  numQuestion4?: number;
  numQuestion5?: number;
  numQuestion6?: number;
  numQuestion7?: number;
  numQuestion8?: number;
  numQuestion9?: number;
  numQuestion10?: number;
  numQuestion11?: number;
  numQuestion12?: number;
  numQuestion13?: number;
  numQuestion14?: number;
  numQuestion15?: number;
  numQuestion16?: number;
  numQuestion17?: number;
  numQuestion18?: number;
  numQuestion19?: number;
  numQuestion20?: number;
  totalTime?: number;
  limitTestSilver?: number;
  limitTestGold?: number;
  limitTestPlatinum?: number;
  remainTest?: number;
}

export const defaultValue: Readonly<IPteExamType> = {};
