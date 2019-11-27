import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CurrentPoll } from "./pages/CurrentPoll";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/Login";
import userService from "./services/userService";
import { GlobalState } from "./state/globalState";
import { useStateValue } from "./state/stateContext";
import { TStateAction, IVote } from "./interfaces";

// const isTheGuyLoggedIn: boolean = false;

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

// session storage = open as long as window is open - key pair strings
// local storage = keeps data accross sessions opening and closing

const AppContent = () => {
  const [globalState, dispatch] = useStateValue();
  useEffect(() => {
    const sessionState = userService.readSessionState();
    if (dispatch == null) {
    } else {
      const changeState: TStateAction = {
        type: "setAuth",
        payload: sessionState,
      };
      dispatch(changeState);
    }
  }, [sessionStorage.getItem("auth")]);

  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={CurrentPoll} />
        {/* <Route exact path={"/poll/:pollId"} component={MainList} /> */}
        <PrivateRoute path={"/dashboard"} component={Dashboard} />

        <Route exact path={"/login"} component={Login} />
      </Switch>
    </Router>
  );
};

export const App = () => {
  return (
    <GlobalState>
      <AppContent />
    </GlobalState>
  );
};
