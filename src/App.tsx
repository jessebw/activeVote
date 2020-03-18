import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { CurrentPoll } from "./pages/CurrentPoll";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/Login";
import userService from "./services/userService";
import { GlobalState } from "./state/globalState";
import { useGlobalState } from "./state/stateContext";
import { TStateAction, IVote } from "./interfaces";
import configService from "./services/configService";
import history from "./history";

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
  const [appReady, setAppReady] = useState<boolean>(false);

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

  useEffect(() => {
    fetch("/app.config.json")
      .then(response => {
        return response.json();
      })
      .then(config => {
        const configState: TStateAction = {
          type: "setConfig",
          payload: config
        };
        dispatch(configState);
        configService.setConfig(config);
      });
  }, []);

  if (globalState.config && globalState.config.serverURL) {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={"/"} component={CurrentPoll} />
          <PrivateRoute path={"/dashboard"} component={Dashboard} />
          <Route exact path={"/login"} component={Login} />
        </Switch>
      </Router>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export const App = () => {
  return (
    <GlobalState>
      <AppContent />
    </GlobalState>
  );
};
