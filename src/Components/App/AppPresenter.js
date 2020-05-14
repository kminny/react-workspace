import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import LoggedIn from "../../LoggedIn";
import LoggedOut from "../../LoggedOut";

const AppPresenter = (props) => (
  <BrowserRouter>
    {console.log(props)}
    {props.isLoggedIn ? <WrappedLoggedOutRoutes /> : <WrappedLoggedInRoutes />}
  </BrowserRouter>
);

const LoggedOutRoutes = (props) => (
  <Switch key={props.location.key}>
    <Route exact={true} path="/" component={LoggedOut} />
  </Switch>
);

const WrappedLoggedOutRoutes = withRouter(LoggedOutRoutes);

const LoggedInRoutes = (props) => (
  <Switch key={props.location.key}>
    <Route exact={true} path="/" component={LoggedIn} />
  </Switch>
);

const WrappedLoggedInRoutes = withRouter(LoggedInRoutes);

export default AppPresenter;
