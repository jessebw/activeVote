import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { IVoteItem } from "../interfaces";

// url loader - bringing images in as 
const logo1 = require ('../img/top11idea.png'); 
console.log(logo1);
const logo2 = require ('../img/RadioActive886.png');
console.log(logo2);

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

// ${var} is inter[polition for string literals (inserting js into strings)
const Title = styled.div`
  background-image: url(${logo1}), url(${logo2});
  background-repeat: no-repeat;
  background-position: left, center;
  background-size: contain;
  background-color: #f2f2f2;
`;

export const MainList = (props: {data: IVoteItem[], name: string}) => {
  return (
    <GridWrapper>
      <Title />
      {props.name}
      {props.data.map((x, i: number) => {
        return (
          <VoteItem key={i}>
            {/* <VoteItemNumber>{i + 1}</VoteItemNumber> */}
            <div>{x.id}{props.name}</div>
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



