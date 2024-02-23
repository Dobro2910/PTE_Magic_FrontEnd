// import Home from "./views/pages/user/home/Home";
import QuestionBankList from './views/pages/user/view_exam/QuestionBankList';
import QuestionBank from './views/pages/user/exam/question-bank/question-bank';
import ScoreTest from './views/pages/user/exam/score-test/score-test';
import MockTest from './views/pages/user/exam/mock-test/mock-test';

const routes = [
  {
    path: "/question_bank",
    name: "Question bank exam",
    icon: "fas fa-microphone-alt text-primary",
    component: QuestionBank,
    layout: "/platform/exam"
  },
  {
    path: "/scoring",
    name: "AI Scoring",
    icon: "fas fa-pencil-alt text-green",
    component: ScoreTest,
    layout: "/platform/exam"
  },
  {
    path: "/mock_test",
    name: "Mock test",
    icon: "fas fa-pencil-alt text-green",
    component: MockTest,
    layout: "/platform/exam"
  },
];

export default routes;
