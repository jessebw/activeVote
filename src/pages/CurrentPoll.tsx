import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { IVoteItem, IPoll } from "../interfaces";
import apiService from "../services/apiService";
import {
  FormModal,
  EmailInput,
  SubmitButton,
  CancelButton,
  LeftRight,
  RightLeft,
  FormModalSelection,
} from "../components/StyledComponents";
<link
  href="https://fonts.googleapis.com/css?family=Montserrat|Roboto:500&display=swap"
  rel="stylesheet"
/>;

const GridWrapper = styled.div`
  background-color: #0c0c0c;
  width: 100vw;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  align-items: center;
  > div {
    height: 250px;
  }
`;

const VoteItem = styled.div<{ imagePath: string }>`
  color: #000;
  font-size: 100%;
  background-image: url(http://activevoteserver.deverall.co.nz/${props => props.imagePath});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .vote-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: width 0.1s, opacity 0.4s;
    transition-timing-function: ease-out;
    opacity: 0;
    height: 100%;
    width: 0%;
    background: RGBA(127, 127, 213, 0.5);
    background: -webkit-linear-gradient(to left, #7f7fd5, #86a8e7, #91eae4);
    background: linear-gradient(to left, #7f7fd5, #86a8e7, #91eae4);
  }
  &:hover {
    .vote-btn {
      /* display: block; */
      width: 100%;
      opacity: 0.8;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const VoteItemOne = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
`;

const VoteButton = styled.div<{ onClick: any }>``;

// ${var} is inter[polition for string literals (inserting js into strings)
const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoteItemWrapper = (props: {
  key: number;
  data: IVoteItem;
  onVote: Function;
}) => {
  return (
    <VoteItem imagePath={props.data.image as string}>
      <div className="vote-info">
        <VoteButton
          className="vote-btn"
          onClick={(e: MouseEvent) => {
            console.log("show form");
            props.onVote(props.data._id);
          }}
        >
          <VoteItemOne>
            <h3>{props.data.artist}</h3>
            <p>{props.data.songName}</p>
            <p>{props.data.album}</p>
          </VoteItemOne>
        </VoteButton>
      </div>
    </VoteItem>
  );
};

export const CurrentPoll = ({ match }: any) => {
  const [voteItems, setVoteItems] = useState<IVoteItem[]>([]);
  const [voteFormOpen, setVoteFormOpen] = useState<boolean>(false);
  const [voteSong, setVoteSong] = useState<string>();
  const [currentPoll, setCurrentPoll] = useState<IPoll>();
  const id = match.params.pollId;

  useEffect(() => {
    apiService
      .getCurrentPoll()
      .then((poll: IPoll) => {
        setCurrentPoll(poll);
        setVoteItems(poll.songs);
      })
      .catch(err => {
        console.log("error happened", err);
      });
  }, []);

  const VoteForm = () => {
    const [email, setEmail] = useState<string>("");
    // * help here *
    return (
      <FormModal>
        <div>
          <CancelButton
            onClick={(e: any) => {
              setVoteFormOpen(false);
            }}
          >
            <LeftRight />
            <RightLeft />
          </CancelButton>
          <p>Please enter your email address to submit vote.</p>
          {/* // * help Here */}
          <FormModalSelection>
            {voteItems.reduce((accumulator: string, value: IVoteItem) => {
              if (value._id === voteSong) {
                return `${value.artist} - ${value.songName}`;
              }
              return accumulator;
            }, "")}
          </FormModalSelection>

          <EmailInput
            placeholder="Email"
            type="email"
            onChange={(event: any) => {
              setEmail(event.target.value);
            }}
          />
          <SubmitButton
            onClick={(e: any) => {
              console.log("Submit Clicked");
              apiService
                .postSubmitVote(email, voteSong as string, currentPoll!._id)
                .then(data => {
                  console.log("second log", data);
                  alert("thanks for Voting");
                  setVoteFormOpen(false);
                });
            }}
          >
            Vote
          </SubmitButton>
        </div>
      </FormModal>
    );
  };

  const buttonClicked = (songID: string) => {
    setVoteFormOpen(true);
    setVoteSong(songID);
  };

  return (
    <React.Fragment>
      {voteFormOpen && <VoteForm />}
      <GridWrapper>
        <Title>
          <h1>{currentPoll && currentPoll.name}</h1>
        </Title>
        {!voteItems || voteItems.length === 0 ? (
          <NoCurrentPolls />
        ) : (
          voteItems.map((voteItem: IVoteItem, i: number) => {
            return (
              <VoteItemWrapper key={i} data={voteItem} onVote={buttonClicked} />
            );
          })
        )}
      </GridWrapper>
    </React.Fragment>
  );
};

const NoPollError = styled.div`
  z-index: 1;
  /* width: 100%;
  height: 100%; */
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: orange;
  > div {
    width: 50%;
    height: 50%;
  }
`;

const NoCurrentPolls = () => {
  return (
    <NoPollError>
      <div>
        <p>No Current Polls</p>
        <p>placeholder - logo here</p>
      </div>
    </NoPollError>
  );
};
