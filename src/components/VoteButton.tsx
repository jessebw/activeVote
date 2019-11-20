import React from "react";
import styled from "styled-components";

// const Button = styled.button`
//   width: 100%;
//   height: 4em;
//   background-color: lightblue;
//   justify-content: flex-end;
//   display: flex;
// `;

const BtnWrapper = styled.div`
  position: absolute;
  background-color: lightblue;
`;
// Custom button component
export const VoteButton: any = (props: any) => {
  return <BtnWrapper {...props}>Vote</BtnWrapper>;
};
