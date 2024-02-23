import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from "src/routes";
import NoAuthRouter from 'src/shared/layouts/router/NoAuthRouter';

const NoAuthRoutes = ({ match }) => (
  <div>
    <Switch>
      { buildRoutes([ ...routes ]) }
    </Switch>
  </div>
);

const buildRoutes = routes => {
  let routesTmp = routes;
  routesTmp = routes.map((prop, key) => {
    if (prop.collapse) {
      return buildRoutes(prop.views);
    }
    return (
        <NoAuthRouter exact path={ prop.layout + prop.path } component={ prop.component } />
    );
  });
  return routesTmp;
};
export default NoAuthRoutes;
