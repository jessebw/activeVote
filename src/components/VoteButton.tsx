import React from "react";
import styled from "styled-components";

const BtnWrapper = styled.div`
  position: absolute;
  background-color: lightblue;
`;

// Custom button component
export const VoteButton: any = (props: any) => {
  return <BtnWrapper {...props}>Vote</BtnWrapper>;
};
