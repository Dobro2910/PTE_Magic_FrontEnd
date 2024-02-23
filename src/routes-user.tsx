import MagicShop from './views/pages/user/payment/MagicShop';
import NewMagicShop from './views/pages/user/payment/NewMagicShop';
import StudyCenter from './views/pages/user/home/StudyCenter';
import NewStudyCenter from './views/pages/user/home/NewStudyCenter';
import Cart from './views/pages/user/payment/Cart';
import Feedback from './views/pages/user/feedback/Feedback';
import CheckingPermission from './views/pages/user/other/CheckingPermission'
import Contact from './views/pages/user/other/Contact'

import Profile from "./views/pages/common/Profile";
import ChangePassword from './views/pages/common/ChangePassword';
import withTracker from 'src/views/pages/components/withTracker';
import ScoreReport from './views/pages/user/other/ScoreReport';
import ExamDetail from './views/pages/user/other/ExamDetail';
import ProductDetail from './views/pages/user/other/ProductDetail';
import Games from "../src/views/pages/user/games/Games"
import HangMan from "../src/views/pages/user/games/HangMan"
import FlipCard from "../src/views/pages/user/games/FlipCard"
import ShuffleCard from "../src/views/pages/user/games/ShuffleCard"

const routes = [
  {
    path: "/home",
    name: "Study Center",
    icon: "benit-icon icon-home text-green",
    component: withTracker(NewStudyCenter),
    layout: "/platform/user"
  },
  {
    path: "/shop",
    name: "MAGIC SHOP",
    icon: "benit-icon icon-shop text-green",
    component: withTracker(NewMagicShop),
    layout: "/platform/user"
  },
  {
    path: "/old-shop",
    name: "MAGIC SHOP",
    icon: "benit-icon icon-shop text-green",
    component: withTracker(MagicShop),
    layout: "/platform/user"
  },
  {
    path: "/profile",
    name: "My account",
    icon: "benit-icon icon-user text-primary",
    extraIcon: "extra-icon-voucher",
    component: withTracker(Profile),
    layout: "/platform/user"
  },
  {
    path: "/cart",
    name: "YOUR CART",
    icon: "fas fa-cart-plus text-green",
    component: withTracker(Cart),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/product-detail",
    name: "Product detail",
    icon: "fas fa-cart-plus text-green",
    component: withTracker(ProductDetail),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: withTracker(Feedback),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/checking_permission",
    name: "Checking Permission",
    component: withTracker(CheckingPermission),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/contact",
    name: "Contact",
    component: withTracker(Contact),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/games",
    name: "Games",
    component: withTracker(Games),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/games/hangman",
    name: "HangMan",
    component: withTracker(HangMan),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/games/flipcard",
    name: "FlipCard",
    component: withTracker(FlipCard),
    hideSidebar: true,
    layout: "/platform/user"
  },
  {
    path: "/games/shufflecard",
    name: "ShuffleCard",
    component: withTracker(ShuffleCard),
    hideSidebar: true,
    layout: "/platform/user"
  },
  // {
  //   path: "/feedback",
  //   name: "Feedback",
  //   icon: "benit-icon icon-shop text-green",
  //   component: withTracker(Feedback),
  //   hideSidebar: true,
  //   layout: "/user"
  // },
  // {
  //   collapse: true,
  //   name: "AI Scoring",
  //   icon: "benit-icon icon-ai text-red",
  //   state: "aiScoringCollapse",
  //   views: [
  //     {
  //       path: "/ai_scoring/read_aloud",
  //       name: "Read aloud",
  //       icon: "icon-ra text-gray",
  //       component: withTracker(ScoringList),
  //       layout: "/user"
  //     },
  //     {
  //       path: "/ai_scoring/repeat_sentence",
  //       name: "Repeat sentence",
  //       icon: "icon-rs text-gray",
  //       component: withTracker(ScoringList),
  //       layout: "/user"
  //     },
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Repeated questions",
  //   icon: "benit-icon icon-repeat",
  //   state: "repeatedQuestionCollapse",
  //   views: [
  //     {
  //       path: "/repeat_question/view-speaking",
  //       name: "Speaking",
  //       icon: "benit-icon icon-speaking size-20",
  //       component: withTracker(QuestionBankBox),
  //       layout: "/user"
  //     },
  //     {
  //       path: "/repeat_question/view-writing",
  //       name: "Writing",
  //       icon: "benit-icon icon-writing size-20",
  //       component: withTracker(QuestionBankBox),
  //       layout: "/user"
  //     },
  //     {
  //       path: "/repeat_question/view-reading",
  //       name: "Reading",
  //       icon: "benit-icon icon-reading size-20",
  //       component: withTracker(QuestionBankBox),
  //       layout: "/user"
  //     },
  //     {
  //       path: "/repeat_question/view-listening",
  //       name: "Listening",
  //       icon: "benit-icon icon-listening size-20",
  //       component: withTracker(QuestionBankBox),
  //       layout: "/user"
  //     }
  //   ]
  // },
  {
    path: "/change_password",
    name: "Change password",
    component: withTracker(ChangePassword),
    layout: "/platform/user",
    hideSidebar: true
  },
  {
    path: "/score_report",
    name: "Score report",
    component: withTracker(ScoreReport),
    layout: "/platform/user",
    hideSidebar: true
  },
  {
    path: "/exam_detail",
    name: "Exam detail",
    component: withTracker(ExamDetail),
    layout: "/platform/user",
    hideSidebar: true
  }
];

export default routes;
