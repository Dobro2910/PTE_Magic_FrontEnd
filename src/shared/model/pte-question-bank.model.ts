import { IPteQuestionCount } from './pte-question-count.model';

export interface IPteQuestionBank {
  speakingRA?: IPteQuestionCount;
  speakingRS?: IPteQuestionCount;
  speakingDI?: IPteQuestionCount;
  speakingRL?: IPteQuestionCount;
  speakingASQ?: IPteQuestionCount;

  writingSWT?: IPteQuestionCount;
  writingE?: IPteQuestionCount;

  readingFRW?: IPteQuestionCount;
  readingFR?: IPteQuestionCount;
  readingROP?: IPteQuestionCount;
  readingMRSA?: IPteQuestionCount;
  readingMRMA?: IPteQuestionCount;

  listeningSST?: IPteQuestionCount;
  listeningFL?: IPteQuestionCount;
  listeningMLSA?: IPteQuestionCount;
  listeningMLMA?: IPteQuestionCount;
  listeningHCS?: IPteQuestionCount;
  listeningSMW?: IPteQuestionCount;
  listeningHIW?: IPteQuestionCount;
  listeningD?: IPteQuestionCount;

  totalQuestionReading?: number;
  totalQuestionWriting?: number;
  totalQuestionListening?: number;
  totalQuestionSpeaking?: number;
}

export const defaultQuestionBankValue: Readonly<IPteQuestionBank> = {};
