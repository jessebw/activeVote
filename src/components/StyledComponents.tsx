import styled from "styled-components";

export const FormModal = styled.div`
  > * {
    /* border: 0px solid #fff; */
    border-radius: 4px;
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
    text-align: center;
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

export const FormModalSelection = styled.div`
  letter-spacing: 3px;
  font-size: 1.2em;
  font-weight: bold;
`;

export const EmailInput = styled.input`
  width: 100%;
  border: 0 solid #000;
  border-radius: 4px;
  text-align: center;
  line-height: 2em;
  :focus {
    outline: 0;
  }
`;

export const SubmitButton = styled.button`
  color: blue;
  width: 100%;
  /* border: 1px solid #fff; */
  border-radius: 4px;
  line-height: 2em;
  color: #fff;
  background-color: #3f7b96;
  :focus {
    outline: 0;
  }
`;

export const CancelButton = styled.div`
  /* border: 1px solid #fff; */
  width: 25px;
  height: 25px;
  position: absolute;
  top: -23px;
  right: -23px;
  margin: auto;
  cursor: pointer;
`;

export const EventButton = styled.button<{ onClick: any }>``;

export const LeftRight = styled.div`
  height: 4px;
  width: 20px;
  position: absolute;
  margin-top: 10px;
  background-color: #ff4b17;
  border-radius: 2px;
  transform: rotate(45deg);
`;
export const RightLeft = styled.div`
  height: 4px;
  width: 20px;
  position: absolute;
  margin-top: 10px;
  background-color: #ff4b17;
  border-radius: 2px;
  transform: rotate(-45deg);
`;
