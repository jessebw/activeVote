import styled from "styled-components";

export const FormModal = styled.div`
  > div {
    border-radius: 4px;
    position: fixed;
    width: 33.3%;
    height: 80%;
    top: 50%;
    left: 50%;
    background: #fff;
    padding: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%);
    z-index: 2;
    text-align: center;
    @media (max-height: 610px) {
      top: 10%;
      height: auto;
      width: 80%;
    }
    @media (max-width: 900px) {
      width: 80%;
    }
  }
  &:after {
    content: "";
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
  }
`;

export const FullPage = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #0c0c0c;
`;
export const FormModalSelection = styled.div`
  letter-spacing: 3px;
  font-weight: bold;
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
  width: 100%;
  border: 0 solid #000;
  border-radius: 4px;
  line-height: 2em;
  font-size: 30px;
  color: #000;
  letter-spacing: 0.3em;
  text-transform: uppercase;
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
  width: 26px;
  height: 26px;
  position: absolute;
  top: 23px;
  right: 23px;
  margin: auto;
  cursor: pointer;
  border-radius: 50%;
`;

export const EventButton = styled.button<{ onClick: any }>``;

// Vote form modal close X
export const LeftRight = styled.div`
  height: 4px;
  width: 20px;
  position: absolute;
  margin-top: 11px;
  margin-left: 3px;
  background-color: black;
  border-radius: 2px;
  transform: rotate(45deg);
`;

export const RightLeft = styled.div`
  height: 4px;
  width: 20px;
  position: absolute;
  margin-top: 11px;
  margin-left: 3px;
  background-color: black;
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
  button {
    :focus {
      outline: 0;
    }
  }
`;

export const PollPageWrapper = styled.div`
padding: 20px;
`;

export const StyledListItem = styled.div`
  background-color: #eaeffd;
  display: flex;
  justify-content: center;
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

export const InputComponent = styled.label``;
