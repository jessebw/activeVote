import React, { useState } from "react";
import userService from "../services/userService";
import { useStateValue } from "../state/stateContext";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";

{
  /* <link
  href="https://fonts.googleapis.com/css?family=Modak&display=swap"
  rel="stylesheet"
/>; */
}

const LoginWrapper = styled.div`
  max-width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  > button {
    width: 100%;
    line-height: 2em;
    border: 1px solid #fff;
    border-radius: 25px;
    background-color: #eaeffd;
    /* * Help here inserting google fonts * */

    /* font-family: "Modak", cursive; */
    /* text-transform: uppercase; */
    cursor: pointer;
    :focus {
      outline: 0;
    }
  }
  > h2 {
    text-align: center;
    font-size: 1.8em;
  }
  > p {
    text-align: center;
    font-size: 0.8em;
    color: ${theme.color.error};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  /* border: 1px solid #fff; */
  /* border-radius: 4px; */
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  /* border-top: none;
  border-left: none;
  border-right: none; */
  /* background-color: #e6e7ee; */
  background-color: #fff;
  border: none;
  border-bottom: 1px dashed #000;

  text-align: center;
  :focus {
    outline: 0;
    background-color: #fff;
  }
`;

const ErrorMsg = styled.p`
  color: ${theme.color.error};
  text-align: center;
`;

const LoginBtn = styled.button``;

export const Login = () => {
  const [globalState, dispatch] = useStateValue();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);

  if (globalState.auth) {
    return <Redirect to="/dashboard" />;
  }

  const authenticateUser = () => {
    userService.authenticateUser(email, password).then(
      data => {
        dispatch({ type: "setAuth", payload: data });
      },
      error => {
        setLoginError(true);
      }
    );
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>
      {loginError && (
        <ErrorMsg>
          Username or Password Error <br /> please try again
        </ErrorMsg>
      )}

      <Input
        placeholder="email"
        type="email"
        onChange={(event: any) => {
          setEmail(event.target.value);
        }}
      />
      <Input
        placeholder="password"
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
        Login
      </button>
      <p>Forgot Username / Password</p>
    </LoginWrapper>
  );
};
