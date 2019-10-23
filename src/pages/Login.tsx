import React, { useState } from "react";
import userService from "../services/userService";
import { useStateValue } from "../state/stateContext";
import { Redirect } from "react-router-dom";

export const Login = () => {
  const [globalState, dispatch] = useStateValue();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (globalState.auth) {
    return <Redirect to="/dashboard" />;
  }

  const authenticateUser = () => {
    userService.authenticateUser(email, password).then(data => {
      console.log("dataLogin", data);
      dispatch({ type: "setAuth", payload: data });
    });
  };

  return (
    <div>
      <input
        type="email"
        onChange={(event: any) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event: any) => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={(e: any) => {
          authenticateUser();
        }}
      >
        enter
      </button>
    </div>
  );
};