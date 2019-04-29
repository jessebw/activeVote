import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

var dummyData = [
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
    image: "./img/trackImage/groeni.jpg",
  },
  {
    songName: "Black Bird",
    artist: "Fat Freddies Drop",
    album: "five",
    image: "./img/trackImage/fatFreddies.jpg",
  },
  {
    songName: "You maintain the stain",
    artist: "Mermaidens",
    album: "six",
    image: "./img/trackImage/mermaidens.jpg",
  },
  {
    songName: "Well of pristene order",
    artist: "Earth Tongue",
    album: "seven",
    image: "./img/trackImage/earthTongue.jpg",
  },
  {
    songName: "Romancy",
    artist: "Ben Woods",
    album: "eight",
    image: "./img/trackImage/benWoods.jpg",
  },
  {
    songName: "Bizzy Living",
    artist: "Clicks",
    album: "nine",
    image: "./img/trackImage/clicks.jpg",
  },
  {
    songName: "Adovcate",
    artist: "Dr Reknaw",
    album: "ten",
    image: "./img/trackImage/drReknaw.jpg",
  },
  {
    songName: "Jimmy cheese",
    artist: "Dan",
    album: "eleven",
    image: "./img/trackImage/cheese.jpg",
  },
];

const GridWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-flow: row;
`;

const VoteItem = styled.div`
  color: #000;
  font-size: 100%;
  /* background-color: deeppink; */
  border: 1px dotted #bbb;
  align-items: center;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const VoteItemNumber = styled.span`
  color: white;
`;

const Title = styled.div`
  background-image: url("/img/RadioActive886.png"), url("/img/top11idea.png");
  background-repeat: no-repeat;
  background-position: left, center;
  background-size: contain;
  background-color: #f2f2f2;
`;

// Custom button component
const Button = () => {
  const Button = styled.button`
    width: 80%;
    border: 1px solid lightblue;
    border-radius: 0.2em;
  `;
  return (
    <div>
      <Button>Vote</Button>
    </div>
  );
};

export const MainList = () => {
  return (
    <GridWrapper>
      <Title />
      {dummyData.map((x, i) => {
        return (
          <VoteItem key={i}>
            {/* <VoteItemNumber>{i + 1}</VoteItemNumber> */}
            <div>{x.artist}</div>
            <div>{x.songName}</div>
            <div>{x.album}</div>
            {/* <div>{x.image}</div> */}
            <Button />
          </VoteItem>
        );
      })}
    </GridWrapper>
  );
};
