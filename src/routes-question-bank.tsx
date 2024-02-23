import QuestionBankList from './views/pages/user/view_exam/QuestionBankList';
import QuestionBankBox from './views/pages/user/view_exam/QuestionBankBox';
import withTracker from './views/pages/components/withTracker';

const routes = [
  {
    path: "/banks/view-speaking",
    name: "Speaking (AI)",
    icon: "benit-icon icon-speaking text-primary",
    extraIcon: "extra-icon-innovation",
    component: withTracker(QuestionBankBox),
    layout: "/platform/user"
  },
  {
    path: "/banks/view-writing",
    name: "Writing",
    icon: "benit-icon icon-writing text-green",
    // extraIcon: "extra-icon-innovation",
    component: withTracker(QuestionBankBox),
    layout: "/platform/user"
  },
  {
    path: "/banks/view-reading",
    name: "Reading",
    icon: "benit-icon icon-reading text-orange",
    component: withTracker(QuestionBankBox),
    layout: "/platform/user"
  },
  {
    path: "/banks/view-listening",
    name: "Listening",
    icon: "benit-icon icon-listening text-indigo",
    component: withTracker(QuestionBankBox),
    layout: "/platform/user"
  },
  {
    path: "/banks/list_question",
    name: "List question",
    icon: "fas fa-headphones-alt text-indigo",
    component: QuestionBankList,
    layout: "/platform/user",
    hideSidebar: true
  },

];

export default routes;
