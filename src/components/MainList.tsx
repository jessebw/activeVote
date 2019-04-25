import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

var dummyData = [
  { songName: "Jimmy cheese", artist: "Dan", album: "Gin" },
  { songName: "jone steak", artist: "Dan", album: "Gin" },
  { songName: "Cat coli", artist: "Dan", album: "Gin" },
  { songName: "fig cheese", artist: "Dan", album: "Gin" },
  { songName: "greta cheese", artist: "Dan", album: "Gin" },
  { songName: "Jimmy cheese", artist: "Dan", album: "Gin" },
  { songName: "Jimmy cheese", artist: "Dan", album: "Gin" },
  { songName: "Jimmy cheese", artist: "Dan", album: "Gin" },
  { songName: "Jimmy cheese", artist: "Dan", album: "Gin" },
  { songName: "Jimmy cheese", artist: "Dan", album: "Gin" },
  { songName: "Jimmy cheese", artist: "Dan", album: "Gin" },
];

const VoteItem = styled.div`
  background: deeppink;
  display: flex;
  span {
    flex: 1 1 auto;
  }
`;

const Jesse = () => {
  return <div>Jesse</div>;
};

const VoteItemNumber = styled.span`
  color: white;
`;

export const MainList = () => {
  return (
    <div>
      {dummyData.map((x, i) => {
        return (
          <VoteItem key={i}>
            <VoteItemNumber>{i + 1}</VoteItemNumber>
            <Jesse />
            <span>{x.songName}</span>
            <span>{x.artist}</span>
            <span>{x.album}</span>
          </VoteItem>
        );
      })}
    </div>
  );
};
