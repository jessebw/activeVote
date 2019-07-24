import React from "react";
import styled from "styled-components";
// import "./components/MainList";
const Button = styled.button`
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
export const VoteButton: any = (props: any) => {
  return (
    <BtnWrapper {...props}>
      <Button>Vote</Button>
    </BtnWrapper>
  );
};
