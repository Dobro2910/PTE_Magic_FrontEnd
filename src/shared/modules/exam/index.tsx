import React from "react";
import { Route, Switch } from "react-router-dom";
import ExamRouter from "src/shared/layouts/router/ExamRouter";
import examRoutes from "src/routes-exam";

const ExamRoutes = ({ match }) => (
  <Switch>{buildRoutes([...examRoutes])}</Switch>
);

const buildRoutes = (routes) => {
  let routesTmp = routes;
  routesTmp = routes.map((prop, key) => {
    if (prop.collapse) {
      return buildRoutes(prop.views);
    }
    return (
      <ExamRouter
        key={prop.path}
        exact
        path={prop.layout + prop.path}
        component={prop.component}
      />
    );
  });
  return routesTmp;
};

export default ExamRoutes;
