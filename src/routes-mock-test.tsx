import withTracker from './views/pages/components/withTracker';
import MockTestList from './views/pages/user/view_exam/MockTestList';
import ExamHistory from './views/pages/user/other/ExamHistory';
import Maintenance from "src/components/Maintenance/Maintenance";

const routes = [
  {
    path: "/mock_test/list",
    name: "Mock test",
    icon: "benit-icon icon-mock text-indigo",
    component: withTracker(MockTestList),
    // component: withTracker(Maintenance),
    extraIcon: "extra-icon-voucher",
    layout: "/platform/user"
  },
  {
    path: "/resource/exam_history",
    name: "Mock test history",
    icon: "benit-icon icon-history",
    component: withTracker(ExamHistory),
    extraIcon: "extra-icon-voucher",
    layout: "/platform/user",
    hideSidebar: true
  },
];

export default routes;
