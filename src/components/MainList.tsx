import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
// import { VoteButton } from "./VoteButton";
import { IVoteItem, IPoll } from "../interfaces";
// import ApiService from "./apiService";
import apiService from "./apiService";
import { Image } from "react-native";

// url loader - bringing images in as
// const logo1 = require("../img/top11idea.png");
// console.log(logo1);
const logo2 = require("../img/RadioActive886.png");
// console.log(logo2);

const GridWrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
  /* border: 1px dotted #bbb; */
  /* align-items: center; */

  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .vote-btn {
    display: none;
  }
  &:hover {
    .vote-btn {
      display: block;
    }
  }
`;

const VoteItemOne = styled.div`
  margin-top: 2.5em;
  /* letter-spacing: 0.8em; */
  font-size: 1em;
  font-weight: 900;
  height: 25%;
`;

const VoteItemTwo = styled.div`
  /* letter-spacing: 0.4em; */
  font-size: 1em;
  font-weight: 300;
  height: 25%;
`;

const VoteItemThree = styled.div`
  height: 25%;
`;

const VoteButton = styled.div<{ onClick: any }>`
  position: absolute;
  /* background-color: blue; */
  /* background-image: linear-gradient(-90deg, lightblue, white); */
  /* display: flex; */
  transform: skewY(-10deg);
  opacity: 0.5;
  height: 50%;
  width: 100%;
  background: RGBA(127, 127, 213, 0.5);
  background: -webkit-linear-gradient(to left, #7f7fd5, #86a8e7, #91eae4);
  background: linear-gradient(to left, #7f7fd5, #86a8e7, #91eae4);

  /* justify-content: flex-end; */
  /* align-self: flex-end; */
  /* position: absolute; */
  /* bottom: 0; */
`;

// ${var} is inter[polition for string literals (inserting js into strings)
const Title = styled.div``;

const VoteItemWrapper = (props: {
  key: number;
  data: IVoteItem;
  onVote: Function;
}) => {
  return (
    <VoteItem imagePath={props.data.image as string}>
      <div className="vote-info">
        <VoteItemOne>{props.data.artist}</VoteItemOne>
        <VoteItemTwo>{props.data.songName}</VoteItemTwo>
        <VoteItemThree>{props.data.album}</VoteItemThree>
        <VoteButton
          className="vote-btn"
          onClick={(e: MouseEvent) => {
            console.log("show form");
            props.onVote(props.data._id);
          }}
        >
          Vote
        </VoteButton>
      </div>
    </VoteItem>
  );
};

export const MainList = ({ match }: any) => {
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

  const VoteModal = styled.div`
    > * {
      position: fixed;
      top: 50%;
      left: 50%;
      background: white;
      padding: 8px;
      border: black 1px solid;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
      transform: translate(-50%, -50%);
      z-index: 2;
    }
    &:after {
      content: "";
      position: fixed;
      z-index: 1;
      background: rgba(0, 0, 0, 0.2);
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `;

  const VoteForm = () => {
    const [email, setEmail] = useState<string>("");
    return (
      <VoteModal>
        <div>
          <p>Please enter your email address and click vote.</p>
          <input
            type="email"
            onChange={(event: any) => {
              setEmail(event.target.value);
            }}
          />
          <button
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
          </button>
          <button
            onClick={(e: any) => {
              setVoteFormOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </VoteModal>
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

const NoCurrentPolls = () => {
  return <div>No Current Polls</div>;
};
