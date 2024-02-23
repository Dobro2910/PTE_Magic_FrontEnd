import Register from "./views/pages/common/Register";
import ForgotPassword from "./views/pages/common/ForgotPassword";
import ForgotPasswordFinish from "./views/pages/common/ForgotPasswordFinish";
import Logout from './views/pages/common/logout';
import Terms from './views/pages/public/Terms';
import Activation from './views/pages/common/Activation';

import withTracker from 'src/views/pages/components/withTracker';
import ThankYou from "user/payment/ThankYou";

const routes = [
  {
    hideSidebar: true,
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      // {
      //   path: "/login",
      //   name: "Login",
      //   component: withTracker(Login),
      //   layout: "/auth"
      // },
      {
        path: "/logout",
        name: "Logout",
        component: withTracker(Logout),
        layout: "/platform/auth"
      },
      {
        path: "/register",
        name: "Register",
        component: withTracker(Register),
        layout: "/platform/auth"
      },
      {
        path: "/reset/init",
        name: "Forgot password init",
        component: withTracker(ForgotPassword),
        layout: "/platform/auth"
      },
      {
        path: "/reset/finish",
        name: "Forgot password finish",
        component: withTracker(ForgotPasswordFinish),
        layout: "/platform/auth"
      },
      {
        path: "/activation",
        name: "Activation",
        component: withTracker(Activation),
        layout: "/platform/auth"
      },
      {
        path: "/thank-you",
        name: "ThankYou",
        component: withTracker(ThankYou),
        layout: "/platform/auth"
      },
      // {
      //   path: "/intro",
      //   name: "Introduction",
      //   component: withTracker(Introduction),
      //   layout: "/auth"
      // },
      // {
      //   path: "/course",
      //   name: "Courses",
      //   component: withTracker(Course),
      //   layout: "/auth"
      // },
      // {
      //   path: "/experience",
      //   name: "Experience",
      //   component: withTracker(Experience),
      //   layout: "/auth"
      // },
      // {
      //   path: "/packages",
      //   name: "Packages",
      //   component: withTracker(Packages),
      //   layout: "/auth"
      // },
      // {
      //   path: "/student",
      //   name: "Student",
      //   component: withTracker(Student),
      //   layout: "/auth"
      // },
      // {
      //   path: "/contact",
      //   name: "Contact",
      //   component: withTracker(Contact),
      //   layout: "/auth"
      // },

      // {
      //   path: "/pricing",
      //   name: "Pricing",
      //   component: withTracker(Pricing),
      //   layout: "/auth"
      // },
      
      {
        path: "/term_policy",
        name: "Term conditions and Privacy Policy",
        component: withTracker(Terms),
        layout: "/platform/auth"
      },
      // {
      //   path: "/lock",
      //   name: "Lock",
      //   component: withTracker(Lock),
      //   layout: "/auth"
      // },
      // {
      //   path: "/timeline",
      //   name: "Timeline",
      //   component: Timeline,
      //   layout: "/admin"
      // },
      // {
      //   path: "/profile",
      //   name: "Profile",
      //   component: Profile,
      //   layout: "/admin"
      // }
    ]
  },
];

export default routes;
