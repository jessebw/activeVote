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
import userService from "./components/userService";
import { GlobalState } from "./state/globalState";
import { useStateValue } from "./state/stateContext";

const isTheGuyLoggedIn: boolean = false;

const PrivateRoute: any = ({ component: Component, ...rest }: any) => {
  const [globalState, dispatch] = useStateValue();
  return (
    <Route
      {...rest}
      render={props => {
        return globalState.auth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

const AppContent = () => {
  const [globalState, dispatch] = useStateValue();
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
      <div>
        The user is <b>{globalState.auth ? "currently" : "not"}</b> logged in.
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <GlobalState>
      <AppContent />
    </GlobalState>
  );
};
