import React, { useState } from "react";
import apiService from "../components/apiService";

const authenticateUser = (email: string, password: string) => {
  apiService.authenticateUser(email, password).then(data => {
    console.log("dataLogin", data);
    localStorage.setItem("auth", JSON.stringify(data));
    // const auth = localStorage.getItem("auth");
    // const token = JSON.parse(auth as string).token;
  });
};

// jesse.b.walsh@gmail.com
// littleatlas

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          authenticateUser(email, password);
        }}
      >
        enter
      </button>
    </div>
  );
};
