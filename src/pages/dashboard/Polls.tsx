import React, { useEffect, useState, ChangeEvent } from "react";
import apiService from "../../services/apiService";
import { IPoll } from "../../interfaces";
import { FormModal, EventButton } from "../../components/StyledComponents";

export const Polls = () => {
  const [pollItems, setPollItems] = useState<IPoll[]>([]);
  const [PollFormOpen, setPollFormOpen] = useState<boolean>(false);

  const CreatePoll = (props: { onCreate: Function }) => {
    const [pollName, setPollName] = useState<string>("");

    return (
      <div>
        <FormModal>
          <div>
            <p>Enter Poll Name</p>

            <input
              type="string"
              onChange={(event: any) => {
                setPollName(event.target.value);
                props.onCreate();
              }}
            />

            <button
              onClick={(e: any) => {
                console.log("Submit Clicked");
                //   apiService
                //     .postSubmitVote(email, voteSong as string, currentPoll!._id)
                //     .then(data => {
                //       console.log("second log", data);
                //       alert("thanks for Voting");
                //       setVoteFormOpen(false);
                //     });
                setPollFormOpen(false);
              }}
            >
              Vote
            </button>
            <button
              onClick={(e: any) => {
                setPollFormOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </FormModal>
      </div>
    );
  };

  useEffect(() => {
    apiService.getAllPolls().then((polls: IPoll[]) => {
      setPollItems(polls);
    });
  }, []);

  return (
    <div>
      <div>
        <h3>Select Poll</h3>
        {pollItems.map((poll: IPoll) => {
          return (
            <div key={poll._id}>
              <p>{poll.name}</p>
              <p>{poll.createdDateTime}</p>
              <button>edit</button>
            </div>
          );
        })}
      </div>
      <div>{/* <button>Create new poll</button> */}</div>
      {CreatePoll}
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
