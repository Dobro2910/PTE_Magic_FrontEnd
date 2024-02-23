export interface IPteQuestionCount {
  type?: string;
  name?: string;
  total?: number;
  remainAttemps?: number;
}

export const defaultValue: Readonly<IPteQuestionCount> = {};
