import React, { useState } from "react";
// import apiService from "../components/apiService";
import userService from "../components/userService";
import { useStateValue } from "../state/stateContext";

// jesse.b.walsh@gmail.com
// littleatlas

export const Login = () => {
  const [globalState, dispatch] = useStateValue();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
