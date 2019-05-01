import React from "react";
import styled from "styled-components";
// import "./components/MainList";

// Custom button component
export const Button = () => {
  const Button = styled.button`
    width: 100%;
    /* border: 1px solid lightblue; */
height: 4em;
background-color: lightblue;
/* justify-content: flex-end; */
  /* display: flex; */
    /* border-radius: 0.2em; */
  `;

  const BtnWrapper = styled.div `
  /* display: flex; */
  width: 100%;
  justify-content: flex-end;
  /* align-self: flex-end; */
  position: absolute;
  bottom: 0;
  `

  return (
    <BtnWrapper>
      <Button>Vote</Button>
    </BtnWrapper>
  );
};
