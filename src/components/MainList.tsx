import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { VoteButton } from "./VoteButton";
import { IVoteItem, IPoll } from "../interfaces";
// import ApiService from "./apiService";
import apiService from "./apiService";

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

const VoteItem = styled.div`
  color: #000;
  font-size: 100%;
  border: 1px dotted #bbb;
  align-items: center;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .vote-info {
    display: none;
  }
  &:hover {
    .vote-info {
      display: block;
    }
  }
`;

const VoteItemOne = styled.div`
  margin-top: 0.8em;
  letter-spacing: 0.8em;
  font-size: 1em;
  font-weight: 900;
  height: 25%;
`;

const VoteItemTwo = styled.div`
  letter-spacing: 0.4em;
  font-size: 1em;
  font-weight: 300;
  height: 25%;
`;

const VoteItemThree = styled.div`
  height: 25%;
`;

// ${var} is inter[polition for string literals (inserting js into strings)
const Title = styled.div``;

const VoteItemWrapper = (props: {
  key: number;
  data: IVoteItem;
  onVote: Function;
}) => {
  return (
    <VoteItem>
      <div className="vote-info">
        <VoteItemOne>{props.data.artist}</VoteItemOne>
        <VoteItemTwo>{props.data.songName}</VoteItemTwo>
        <VoteItemThree>{props.data.album}</VoteItemThree>
        <VoteButton
          onClick={(e: MouseEvent) => {
            console.log("show form");
            props.onVote(props.data._id);
          }}
        />
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

  const VoteForm = () => {
    const [email, setEmail] = useState<string>();
    return (
      <div>
        {voteSong}
        <br />
        {email}
        <br />
        {currentPoll && currentPoll._id}
        <input
          type="email"
          onChange={(event: any) => {
            setEmail(event.target.value);
          }}
        />
        <button>submit</button>
      </div>
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
          <h1>Top Eleven</h1>
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
        ;
      </GridWrapper>
    </React.Fragment>
  );
};

const NoCurrentPolls = () => {
  return <div>No Current Polls</div>;
};
