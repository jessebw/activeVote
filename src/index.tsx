import React from "react";
import ReactDOM from "react-dom";
import { MainList } from "./components/MainList";
// import Potato from './components/MainList';
import "./sass/style";
import "normalize.css";

ReactDOM.render(
  <div>
    Active vote
    <MainList />
  </div>,
  document.getElementById("app")
);
