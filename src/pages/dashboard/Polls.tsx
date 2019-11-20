import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiService";
import { IPoll } from "../../interfaces";
import styled from "styled-components";
import { FormModal, EventButton } from "../../components/StyledComponents";

const SelectPollList = styled.div`
  display: grid;
`;

export const Polls = () => {
  const [pollItems, setPollItems] = useState<IPoll[]>([]);
  const [PollFormOpen, setPollFormOpen] = useState<boolean>(false);

  // convert time to UTC
  // const dateFormatted = () => {
  //   const pollDate = poll.createdDateTime;
  //   const newDate = new Date(pollDate).toUTCtime();
  //   return newDate;
  // };

  useEffect(() => {
    apiService.getAllPolls().then((polls: IPoll[]) => {
      setPollItems(polls);
    });
  }, []);

  return (
    <div>
      <div>
        <div>
          <h3>Select Poll</h3>
          <EventButton
            // className="createVoteBtntn"
            onClick={(e: MouseEvent) => {
              //   console.log("show form");
              return;
              setPollFormOpen(true);
            }}
          >
            Create New Poll
          </EventButton>
        </div>
        {pollItems.map((poll: IPoll) => {
          return (
            <SelectPollList key={poll._id}>
              {/* {console.log("DATE:" + dateFormatted())} */}
              <p>{`${poll.name} - ${poll.createdDateTime}`}</p>
              <nav>
                <Link to={"/dashboard/editpoll/" + poll._id}>
                  <button>edit</button>
                </Link>
              </nav>
            </SelectPollList>
          );
        })}
      </div>
    </div>
  );
};

{
  /* <FormModal>
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
</FormModal>
);
};

const buttonClicked = (songID: string) => {
setVoteFormOpen(true);
setVoteSong(songID);
}; */
}
