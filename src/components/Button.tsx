import React from "react";
import styled from "styled-components";
// import "./components/MainList";

// Custom button component
export const Button = () => {
  const Button = styled.button`
    width: 80%;
    border: 1px solid lightblue;
    border-radius: 0.2em;
  `;

  return (
    <div>
      <Button>Vote</Button>
    </div>
  );
};
