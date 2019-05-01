import React from "react";
import ReactDOM from "react-dom";
import { MainList } from "./components/MainList";

const dummyData = [
    {
      songName: "Here we bend",
      artist: "Womb",
      album: "one",
      image: "./img/trackImage/womb.jpg",
    },
    {
      songName: "jams",
      artist: "Finn Johannson",
      album: "two",
      image: "./img/trackImage/finnJohannson.jpg",
    },
    {
      songName: "Skeletons from oblivion",
      artist: "Melting Faces",
      album: "three",
      image: "./img/trackImage/meltingFaces.jpg",
    },
    {
      songName: "Hewn",
      artist: "Groeni",
      album: "four",
      image: "../img/trackImage/groeni.jpg",
    },
    {
      songName: "Black Bird",
      artist: "Fat Freddies Drop",
      album: "five",
      image: "../img/trackImage/fatFreddies.jpg",
    },
    {
      songName: "You maintain the stain",
      artist: "Mermaidens",
      album: "six",
      image: "../img/trackImage/mermaidens.jpg",
    },
    {
      songName: "Well of pristene order",
      artist: "Earth Tongue",
      album: "seven",
      image: "../img/trackImage/earthTongue.jpg",
    },
    {
      songName: "Romancy",
      artist: "Ben Woods",
      album: "eight",
      image: "../img/trackImage/benWoods.jpg",
    },
    {
      songName: "Bizzy Living",
      artist: "Clicks",
      album: "nine",
      image: "../img/trackImage/clicks.jpg",
    },
    {
      songName: "Adovcate",
      artist: "Dr Reknaw",
      album: "ten",
      image: "../img/trackImage/drReknaw.jpg",
    },
    {
      id: 11,
      songName: "Jimmy cheese",
      artist: "Dan",
      album: "eleven",
      image: "../img/trackImage/cheese.jpg",
    },
  ];

  

export const App = () => {
    return (
    <div>
    <MainList data={dummyData} name='jesse'/>
    </div>
    );
  };
  