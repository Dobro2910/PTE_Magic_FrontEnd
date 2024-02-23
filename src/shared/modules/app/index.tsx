import React from "react";
import { Route, Switch } from "react-router-dom";
import userRoutes from "src/routes-user";
import questionBankRoutes from "src/routes-question-bank";
import mockTestRoutes from "src/routes-mock-test";
import resourceRoutes from "src/routes-resource";
import UserRouter from "src/shared/layouts/router/UserRouter";

const Routes = ({ match }) => (
  <Switch>
    {buildRoutes([
      ...userRoutes,
      ...questionBankRoutes,
      ...resourceRoutes,
      ...mockTestRoutes,
    ])}
  </Switch>
);

const buildRoutes = (routes) => {
  let routesTmp = routes;
  function myFunction() {
    var elmnt = document.getElementById("myDIV");
    var x = elmnt.scrollLeft;
    var y = elmnt.scrollTop;
    console.log(y)
  }
  routesTmp = routes.map((prop, key) => {
    if (prop.collapse) {
      return buildRoutes(prop.views);
    }
    return (
        // <div id="myDIV" onScroll={myFunction}>
          <UserRouter
              exact
              key={`userrouter-${key}`}
              path={prop.layout + prop.path}
              component={prop.component}
          />
    );
  });
  return routesTmp;
};

export default Routes;
