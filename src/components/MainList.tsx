import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

var dummyData = [
  { songName: "Here we bend", artist: "Womb", album: "one" },
  { songName: "jams", artist: "FKJ", album: "two" },
  {
    songName: "Skeletons from oblivion",
    artist: "Melting Faces",
    album: "three",
  },
  { songName: "Hewn", artist: "Groeni", album: "four" },
  { songName: "Black Bird", artist: "Fat Freddies Drop", album: "five" },
  { songName: "You maintain the stain", artist: "Mermaidens", album: "six" },
  {
    songName: "Well of pristene order",
    artist: "Earth Tungue",
    album: "seven",
  },
  { songName: "Romancy", artist: "Ben Woods", album: "eight" },
  { songName: "Bizzy Living", artist: "Clicks", album: "nine" },
  { songName: "Adovcate", artist: "Dr Reknaw", album: "ten" },
  { songName: "Jimmy cheese", artist: "Dan", album: "eleven" },
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

export const MainList = () => {
  return (
    <GridWrapper>
      {/* <div> */}
      <Title />
      {dummyData.map((x, i) => {
        return (
          <VoteItem key={i}>
            {/* <VoteItemNumber>{i + 1}</VoteItemNumber> */}
            <div>{x.artist}</div>
            <div>{x.songName}</div>
            <div>{x.album}</div>
          </VoteItem>
        );
      })}
      {/* </div> */}
    </GridWrapper>
  );
};
