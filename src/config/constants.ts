export const GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID;
export const FACEBOOK_MESSENGER_APP_ID = process.env.FACEBOOK_MESSENGER_APP_ID;
export const FACEBOOK_MESSENGER_PAGE_ID = process.env.FACEBOOK_MESSENGER_PAGE_ID; 

export const AUTH_TOKEN_KEY = 'benit-pte-jwtToken';

export const AVATAR_DEFAULT = "//www.gravatar.com/avatar/4d317e9d4140af19a6d6b0b55fc68b7b?s=200&r=pg&d=mm";
export const AVATAR_TICTOK = require("assets/img/gif/accountTictok.gif")

export const AUTHORITIES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
  };
  
  export const messages = {
    DATA_ERROR_ALERT: 'Internal Error'
  };

  export const APP_TIMESTAMP_FORMAT_TEXT = 'DD MMM /YYYY';

  export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
  export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
  export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
  export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm:ss';
  export const APP_WHOLE_NUMBER_FORMAT = '0,0';
  export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

  export const RECORDED_FILE_EXTENSION = ".wav";
  
  export const VOUCHER_TYPE = {
    DISCOUNT: 'DISCOUNT',
    POINT: 'POINT'
  };

  export const EXAM_GROUP = {
    FREE_SAMPLE: 'FREE_SAMPLE',
    SKILL_TEST: 'SKILL_TEST',
    QUESTION_BANK: 'QUESTION_BANK',
    MOCK_TEST: 'MOCK_TEST',
    SCORE_TEST: 'SCORE_TEST',
    REPEATED_QUESTION: 'REPEATED_QUESTION'
  };
  
  export const QUESTION_TYPE = {
    SPEAKING_READ_ALOUD: 'SPEAKING_READ_ALOUD',
    SPEAKING_REPEAT_SENTENCE: 'SPEAKING_REPEAT_SENTENCE',
    SPEAKING_DESCRIBE_IMAGE: 'SPEAKING_DESCRIBE_IMAGE',
    SPEAKING_RETELL_LECTURE: 'SPEAKING_RETELL_LECTURE',
    SPEAKING_ANSWER_SHORT_QUESTION: 'SPEAKING_ANSWER_SHORT_QUESTION',
    WRITING_SUMMARIZE_WRITTEN_TEXT: 'WRITING_SUMMARIZE_WRITTEN_TEXT',
    WRITING_ESSAY: 'WRITING_ESSAY',
    READING_FIB_R_W: 'READING_FIB_R_W',
    READING_FIB_R: 'READING_FIB_R',
    READING_RE_ORDER_PARAGRAPH: 'READING_RE_ORDER_PARAGRAPH',
    READING_MCQ_R_SINGLE_ANSWER: 'READING_MCQ_R_SINGLE_ANSWER',
    READING_MCQ_R_MULTIPLE_ANSWER: 'READING_MCQ_R_MULTIPLE_ANSWER',
    LISTENING_SUMMARIZE_SPOKEN_TEXT: 'LISTENING_SUMMARIZE_SPOKEN_TEXT',
    LISTENING_FIB_L: 'LISTENING_FIB_L',
    LISTENING_MCQ_L_SINGLE_ANSWER: 'LISTENING_MCQ_L_SINGLE_ANSWER',
    LISTENING_MCQ_L_MULTIPLE_ANSWER: 'LISTENING_MCQ_L_MULTIPLE_ANSWER',
    LISTENING_HIGHLIGHT_CORRECT_SUMMARY: 'LISTENING_HIGHLIGHT_CORRECT_SUMMARY',
    LISTENING_SELECT_MISSING_WORD: 'LISTENING_SELECT_MISSING_WORD',
    LISTENING_HIGHLIGHT_INCORRECT_WORD: 'LISTENING_HIGHLIGHT_INCORRECT_WORD',
    LISTENING_DICTATION: 'LISTENING_DICTATION',
    FINISH: 'FINISH',
    TIME_BREAK: 'TIME_BREAK'
  };
  
  export const TIME_REMAINING_EXAM_TEST = {
    SPEAKING_READ_ALOUD: null,
    SPEAKING_REPEAT_SENTENCE: null,
    SPEAKING_DESCRIBE_IMAGE: null,
    SPEAKING_RETELL_LECTURE: null,
    SPEAKING_ANSWER_SHORT_QUESTION: null,
    WRITING_SUMMARIZE_WRITTEN_TEXT: 10, // 10m
    WRITING_ESSAY: 20,
    READING_FIB_R_W: 2,
    READING_FIB_R: 2,
    READING_RE_ORDER_PARAGRAPH: 2,
    READING_MCQ_R_SINGLE_ANSWER: 2,
    READING_MCQ_R_MULTIPLE_ANSWER: 2,
    LISTENING_SUMMARIZE_SPOKEN_TEXT: 10, // 10
    LISTENING_FIB_L: 2,
    LISTENING_MCQ_L_SINGLE_ANSWER: 2,
    LISTENING_MCQ_L_MULTIPLE_ANSWER: 2,
    LISTENING_HIGHLIGHT_CORRECT_SUMMARY: 2,
    LISTENING_SELECT_MISSING_WORD: 2,
    LISTENING_HIGHLIGHT_INCORRECT_WORD: 2,
    LISTENING_DICTATION: 2
  };
  
  export const TIME_REMAINING_MOCK_TEST = {
    SPEAKING_GROUP: 35,
    WRITING_SUMMARIZE_WRITTEN_TEXT: 10, // 10m
    WRITING_ESSAY: 20,
    READING_GROUP: 30,
    LISTENING_SUMMARIZE_SPOKEN_TEXT: 10, // 10
    LISTENING_GROUP: 25,
    TIME_BREAK: 10
    
  };
  
  export const TIME_REMAINING_QUESTION_BANK = {
    WRITING_SUMMARIZE_WRITTEN_TEXT: 10, // 10m
    WRITING_ESSAY: 20
  };
  
  // second
  export const TIME_PREPARE_AUDIO = {
    SPEAKING_READ_ALOUD: 0,
    SPEAKING_REPEAT_SENTENCE: 5,
    SPEAKING_RETELL_LECTURE: 3,
    SPEAKING_ANSWER_SHORT_QUESTION: 3,
    LISTENING_SUMMARIZE_SPOKEN_TEXT: 12,
    LISTENING_FIB_L: 7,
    LISTENING_MCQ_L_SINGLE_ANSWER: 5,
    LISTENING_MCQ_L_MULTIPLE_ANSWER: 5,
    LISTENING_HIGHLIGHT_CORRECT_SUMMARY: 10,
    LISTENING_SELECT_MISSING_WORD: 5,
    LISTENING_HIGHLIGHT_INCORRECT_WORD: 5,
    LISTENING_DICTATION: 7
  };
  
  export const TIME_PREPARE_RECORDER = {
    SPEAKING_READ_ALOUD: 40,
    SPEAKING_REPEAT_SENTENCE: 2,
    SPEAKING_DESCRIBE_IMAGE: 25,
    SPEAKING_RETELL_LECTURE: 10,
    SPEAKING_ANSWER_SHORT_QUESTION: 3
  };
  
  export const TIME_LENGTH_RECORDER = {
    SPEAKING_READ_ALOUD: 40,
    SPEAKING_REPEAT_SENTENCE: 10,
    SPEAKING_DESCRIBE_IMAGE: 40,
    SPEAKING_RETELL_LECTURE: 40,
    SPEAKING_ANSWER_SHORT_QUESTION: 10
  };
  
  export const ANIMATION_IN = 'fadeInRight';
  export const ANIMATION_OUT = 'fadeOutLeft';
  

  export const QUESTION_PACK_NUMBER = 20;

  export const EVENT = {
    INIT_STORE : "INIT_STORE",
    ON_EXAM : "ON_EXAM",
    ON_SKIP_WAIT_RECORD : "ON_SKIP_WAIT_RECORD",
    ON_GO_QUESTION : "ON_GO_QUESTION",
    STORED_ANSWER: "STORED_ANSWER",
    CLEAR_ANSWER: "CLEAR_ANSWER",
    OPEN_RIGHT_SIDEBAR : "OPEN_RIGHT_SIDEBAR",
  }

  export const PAYMENT_METHOD = {
    PAYPAL : "Paypal",
    STRIPE : "Stripe",
    MANUAL : "Manual"
  }


  export const AI_QUESTION_TYPES = [
    "SPEAKING_READ_ALOUD",
    "SPEAKING_REPEAT_SENTENCE",
    "SPEAKING_DESCRIBE_IMAGE",
    "SPEAKING_RETELL_LECTURE",
    "SPEAKING_ANSWER_SHORT_QUESTION"
    // "WRITING_SUMMARIZE_WRITTEN_TEXT",
    // "WRITING_ESSAY"
  ];

  export const QUESTION_TYPE_FULL = {
    SPEAKING_READ_ALOUD: { code: "RA", name: "Read aloud" },
    SPEAKING_REPEAT_SENTENCE: { code: "RS", name: "Repeat sentence" },
    SPEAKING_DESCRIBE_IMAGE: { code: "DI", name: "Describe image" },
    SPEAKING_RETELL_LECTURE: { code: "RL", name: "Retell lecture" },
    SPEAKING_ANSWER_SHORT_QUESTION: {
      code: "ASQ",
      name: "Answer short question",
    },
    WRITING_SUMMARIZE_WRITTEN_TEXT: {
      code: "SWT",
      name: "Summarize written text",
    },
    WRITING_ESSAY: { code: "E", name: "Write essay [WE]" },
    READING_FIB_R_W: { code: "FIB_RW", name: "R&W: Fill in the blanks [RWFIB]" },
    READING_FIB_R: { code: "FIB", name: "R: Fill in the blanks [RFIB]" },
    READING_RE_ORDER_PARAGRAPH: { code: "ROP", name: "Re-order paragraphs" },
    READING_MCQ_R_SINGLE_ANSWER: { code: "SA", name: "MC, choose single answer" },
    READING_MCQ_R_MULTIPLE_ANSWER: { code: "MA", name: "MC, choose multiple answers" },
    LISTENING_SUMMARIZE_SPOKEN_TEXT: { code: "SST", name: "Summarize spoken text" },
    LISTENING_FIB_L: { code: "FIB", name: "Fill in the blanks [LFIB]" },
    LISTENING_MCQ_L_SINGLE_ANSWER: {
      code: "SA",
      name: "MC, choose single answer",
    },
    LISTENING_MCQ_L_MULTIPLE_ANSWER: { code: "MA", name: "MC, choose multiple answers" },
    LISTENING_HIGHLIGHT_CORRECT_SUMMARY: { code: "HCS", name: "Highlight correct summary" },
    LISTENING_SELECT_MISSING_WORD: { code: "SMW", name: "Select missing words" },
    LISTENING_HIGHLIGHT_INCORRECT_WORD: { code: "HIW", name: "Highlight incorect words" },
    LISTENING_DICTATION: { code: "D", name: "Write from dictation [WFD]" },
  };