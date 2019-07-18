import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { MainList } from "./components/MainList";
// import { CustomBrowserRouter } from "./routing/router";

const dummyData = [
  {
    songName: "Here we bend",
    artist: "Womb",
    album: "Testies",
    image: "./img/trackImage/womb.jpg",
  },
  {
    songName: "jams",
    artist: "Finn Johannson",
    album: "Marmalaids",
    image: "./img/trackImage/finnJohannson.jpg",
  },
  {
    songName: "Skeletons from oblivion",
    artist: "Melting Faces",
    album: "Plastic sergery",
    image: "./img/trackImage/meltingFaces.jpg",
  },
  {
    songName: "Hewn",
    artist: "Groeni",
    album: "Green",
    image: "../img/trackImage/groeni.jpg",
  },
  {
    songName: "Black Bird",
    artist: "Fat Freddies Drop",
    album: "Thin johns jump",
    image: "../img/trackImage/fatFreddies.jpg",
  },
  {
    songName: "You maintain the stain",
    artist: "Mermaidens",
    album: "Fairaidens",
    image: "../img/trackImage/mermaidens.jpg",
  },
  {
    songName: "Well of pristene order",
    artist: "Earth Tongue",
    album: "Water cheeks",
    image: "../img/trackImage/earthTongue.jpg",
  },
  {
    songName: "Romancy",
    artist: "Ben Woods",
    album: "Cut",
    image: "../img/trackImage/benWoods.jpg",
  },
  {
    songName: "Bizzy Living",
    artist: "Clicks",
    album: "tings",
    image: "../img/trackImage/clicks.jpg",
  },
  {
    songName: "Adovcate",
    artist: "Dr Reknaw",
    album: "checkup",
    image: "../img/trackImage/drReknaw.jpg",
  },
  {
    //   id: 11,
    songName: "Jimmy cheese",
    artist: "Dan",
    album: "eat cheese or die trying",
    image: "../img/trackImage/cheese.jpg",
  },
];

const Admin = () => {
  return <h2>Poos and Wees</h2>;
};

export const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"} component={MainList} />
          {/* <Route exact path={"/poll/:pollId"} component={MainList} /> */}
          <Route exact path={"/admin"} component={Admin} />
        </Switch>
      </Router>
    </div>
  );
};
