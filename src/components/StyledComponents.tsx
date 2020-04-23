import styled from "styled-components";

export const FormModal = styled.div`
  > * {
    border-radius: 4px;
    position: fixed;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    /* background: rgba(255, 255, 255, 0.5); */
    background: #fff;
    padding: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%);
    z-index: 2;
    text-align: center;
  }
  &:after {
    content: "";
    position: fixed;
    z-index: 1;
    /* background: rgba(0, 0, 0, 0.7); */
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const FullPage = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
export const FormModalSelection = styled.div`
  letter-spacing: 3px;
  /* font-size: 1.2em; */
  font-weight: bold;
  /* margin-bottom: 2em; */
`;

export const EmailInput = styled.input`
  width: 60%;
  border: 0 solid #000;
  border-bottom: 1px dashed #000;
  border-radius: 4px;
  text-align: center;
  line-height: 2em;
  font-size: 1.5em;
  :focus {
    outline: 0;
  }
`;

export const SubmitButton = styled.div`
  /* color: blue; */
  width: 100%;
  border: 0 solid #000;
  border-radius: 4px;
  line-height: 2em;
  font-size: 30px;
  color: #000;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  /* background-color: #3f7b96; */
  background-color: #fff;
  :focus {
    outline: 0;
  }
  :hover {
    color: red;
    cursor: pointer;
  }
`;

export const CancelButton = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 23px;
  right: 23px;
  margin: auto;
  cursor: pointer;
`;

export const EventButton = styled.button<{ onClick: any }>``;

// Vote form modal close X
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

export const UserStatus = styled.div`
  position: absolute;
  bottom: 0;
  margin: 10px;
  left: 0;
`;

export const PollFormWrapper = styled.div`
  margin: 2em;
  button {
    :focus {
      outline: 0;
    }
  }
`;

export const PollPageWrapper = styled.div``;

export const StyledListItem = styled.div`
  background-color: #eaeffd;
  margin: 5px;
  display: flex;
  > div {
    padding: 5px;
    flex: 1 1 auto;
  }
  > img {
    height: 50px;
    width: 50px;
    flex: 0 0 auto;
  }
`;

export const InputComponent = styled.label`
  /* line-height: 2em;
  margin-right: 2em;
  input {
    border: none;
    border-bottom: 1px dashed #000;
    text-align: center;
    :focus {
      outline: 0;
    }
  } */
`;
