import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { IVoteItem } from "../interfaces";
// import ApiService from "./apiService";
import httpService from "./httpService";
console.log(httpService);

// url loader - bringing images in as
// const logo1 = require("../img/top11idea.png");
// console.log(logo1);
const logo2 = require("../img/RadioActive886.png");
// console.log(logo2);

const GridWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  align-items: center;
  > div {
    height: 250px;
  }
`;

const VoteItem = styled.div`
  color: #000;
  font-size: 100%;
  border: 1px dotted #bbb;
  align-items: center;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .vote-info {
    display: none;
  }
  &:hover {
    .vote-info {
      display: block;
    }
  }
`;

const VoteItemOne = styled.div`
  margin-top: 0.8em;
  letter-spacing: 0.8em;
  font-size: 1em;
  font-weight: 900;
  height: 25%;
`;

const VoteItemTwo = styled.div`
  letter-spacing: 0.4em;
  font-size: 1em;
  font-weight: 300;
  height: 25%;
`;

const VoteItemThree = styled.div`
  height: 25%;
`;

// ${var} is inter[polition for string literals (inserting js into strings)
const Title = styled.div``;

const VoteItemWrapper = (props: { key: number; data: IVoteItem }) => {
  return (
    <VoteItem>
      <div className="vote-info">
        <VoteItemOne>{props.data.artist}</VoteItemOne>
        <VoteItemTwo>{props.data.songName}</VoteItemTwo>
        <VoteItemThree>{props.data.album}</VoteItemThree>
        <Button />
      </div>
    </VoteItem>
  );
};

export const MainList = (props: { data: IVoteItem[] }) => {
  const [voteItems, setVoteItems] = useState([]);
  useEffect(() => {
    httpService
      .get(
        "http://activevoteserver.deverall.co.nz/poll/" +
          "5cd2b86784ae3822a2678bba"
      )
      .then(result => {
        console.log("POO", result);
        setVoteItems(result.songs);
      });
  }, []);

  return (
    <GridWrapper>
      <Title>
        <h1>Top Eleven</h1>
      </Title>
      {voteItems.map((voteItem: IVoteItem, i: number) => {
        return <VoteItemWrapper key={i} data={voteItem} />;
      })}
    </GridWrapper>
  );
};
