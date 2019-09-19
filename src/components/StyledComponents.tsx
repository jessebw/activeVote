import styled from "styled-components";

export const FormModal = styled.div`
  > * {
    position: fixed;
    top: 50%;
    left: 50%;
    background: rgba(255, 255, 255, 0.5);
    padding: 8px;
    /* border: black 1px solid; */
    /* border-radius: 12px; */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  &:after {
    content: "";
    position: fixed;
    z-index: 1;
    background: rgba(0, 0, 0, 0.7);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const EventButton = styled.button<{ onClick: any }>``;
