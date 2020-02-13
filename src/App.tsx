import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { CurrentPoll } from "./pages/CurrentPoll";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/Login";
import userService from "./services/userService";
import { GlobalState } from "./state/globalState";
import { useGlobalState } from "./state/stateContext";
import { TStateAction, IVote } from "./interfaces";
import apiService from "./services/apiService";
import httpService from "./services/httpService";

// const isTheGuyLoggedIn: boolean = false;

const PrivateRoute: any = ({ component: Component, ...rest }: any) => {
  const [globalState, dispatch] = useGlobalState();

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
  const [globalState, dispatch] = useGlobalState();
  useEffect(() => {
    const sessionState = userService.readSessionState();
    if (dispatch == null) {
    } else {
      const changeState: TStateAction = {
        type: "setAuth",
        payload: sessionState
      };
      dispatch(changeState);
    }
  }, [sessionStorage.getItem("auth")]);

  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={CurrentPoll} />
        <PrivateRoute path={"/dashboard"} component={Dashboard} />
        <Route exact path={"/login"} component={Login} />
      </Switch>
    </Router>
  );
};

export const App = () => {
  const [globalState, dispatch] = useGlobalState();
  const [appReady, setAppReady] = useState<boolean>(false);

  useEffect(() => {
    fetch("/app.config.json")
      .then(response => {
        return response.json();
      })
      .then(config => {
        dispatch({
          type: "setConfig",
          payload: config
        });
        apiService.setConfig(config);
        userService.setConfig(config);
        httpService.setConfig(config);
        setAppReady(true);
      });
  }, []);

  return <GlobalState>{appReady && <AppContent />}</GlobalState>;
};
