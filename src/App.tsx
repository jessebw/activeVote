import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CurrentPoll } from "./pages/CurrentPoll";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

const isTheGuyLoggedIn: boolean = false;

const PrivateRoute: any = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props => {
      return isTheGuyLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"} component={CurrentPoll} />
          {/* <Route exact path={"/poll/:pollId"} component={MainList} /> */}
          <PrivateRoute exact path={"/dashboard"} component={Dashboard} />
          <Route exact path={"/login"} component={Login} />
        </Switch>
      </Router>
    </div>
  );
};
