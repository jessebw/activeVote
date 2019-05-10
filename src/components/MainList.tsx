import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { IVoteItem } from "../interfaces";

// url loader - bringing images in as
const logo1 = require("../img/top11idea.png");
// console.log(logo1);
const logo2 = require("../img/RadioActive886.png");
// console.log(logo2);

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
  border: 1px dotted #bbb;
  align-items: center;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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

const VoteItemNumber = styled.span`
  color: white;
`;

// ${var} is inter[polition for string literals (inserting js into strings)
const Title = styled.div`
  background-image: url(${logo2}), url(${logo1});
  background-repeat: no-repeat;
  background-position: left, center;
  background-size: contain;
  background-color: #f2f2f2;
`;

const VoteItemWrapper = (props: {
  key: number;
  data: IVoteItem;
  shouldShowData: boolean;
  setShowData: Function;
}) => {
  return (
    <VoteItem
      onClick={e => {
        props.setShowData(!props.shouldShowData);
      }}
      onMouseOver={e => {
        props.setShowData(true);
      }}
      onMouseOut={e => {
        props.setShowData(false);
      }}
    >
      {props.shouldShowData && (
        <div>
          <VoteItemOne>{props.data.artist}</VoteItemOne>
          <VoteItemTwo>{props.data.songName}</VoteItemTwo>
          <VoteItemThree>{props.data.album}</VoteItemThree>
          <Button />
        </div>
      )}
    </VoteItem>
  );
};

export const MainList = (props: { data: IVoteItem[]; name: string }) => {
  const defaultShowData: any = {};
  props.data.forEach((voteItemData, i) => {
    defaultShowData[i] = false;
  });
  const [showData, setShowData] = useState(defaultShowData);
  console.log(defaultShowData);

  const updateShowDataObject = (key: number, state: boolean) => {
    console.log(key);
    console.log(state);
    const newShowData: any = {};
    props.data.forEach((voteData: IVoteItem, i: number) => {
      if (i === key) {
        newShowData[i] = state;
      } else {
        newShowData[i] = false;
      }
      console.log(i === key);
    });
    console.log("newShowData", newShowData);
    setShowData(newShowData);
  };

  return (
    <GridWrapper>
      <Title />
      {props.data.map((voteItem, i: number) => {
        return (
          <VoteItemWrapper
            key={i}
            data={voteItem}
            shouldShowData={showData[i]}
            setShowData={(state: boolean) => {
              updateShowDataObject(i, state);
            }}
          />
        );
      })}
    </GridWrapper>
  );
};
