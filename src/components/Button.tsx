import React from "react";
import styled from "styled-components";
// import "./components/MainList";
const VoteButton = styled.button`
  width: 100%;
  height: 4em;
  background-color: lightblue;
  justify-content: flex-end;
  display: flex;
`;

const BtnWrapper = styled.div`
  /* display: flex; */
  height: 25%;
  width: 100%;

  /* justify-content: flex-end; */
  /* align-self: flex-end; */
  /* position: absolute; */
  /* bottom: 0; */
`;
// Custom button component
export const Button: any = () => {
  return (
    <BtnWrapper>
      <VoteButton>Vote</VoteButton>
    </BtnWrapper>
  );
};
