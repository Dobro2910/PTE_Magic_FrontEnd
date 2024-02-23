// import Home from "./views/pages/user/home/Home";
import CommingSoon from './views/pages/common/CommingSoon';
import VideoTutorial from './views/pages/user/other/VideoTutorial';

const routes = [
  {
    path: "/resource/tutorial_video",
    name: "Tutorial Videos",
    icon: "benit-icon icon-youtube",
    component: VideoTutorial,
    layout: "/platform/user"
  },
  // {
  //   path: "/resource/games",
  //   name: "Games",
  //   icon: "benit-icon icon-games",
  //   component: CommingSoon,
  //   extraIcon: "extra-icon-lock",
  //   navItemClass: "opacity-5",
  //   layout: "/user"
  // },
  // {
  //   path: "/resource/grammar",
  //   name: "Grammar",
  //   icon: "benit-icon icon-grammar",
  //   component: CommingSoon,
  //   extraIcon: "extra-icon-lock",
  //   navItemClass: "opacity-5",
  //   layout: "/user"
  // },
  // {
  //   path: "/resource/vocabulary",
  //   name: "Vocabulary",
  //   icon: "benit-icon icon-vocabulary",
  //   component: CommingSoon,
  //   extraIcon: "extra-icon-lock",
  //   navItemClass: "opacity-5",
  //   layout: "/user"
  // },
];

export default routes;
