import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiService";
import { IPoll, IPollResults } from "../../interfaces";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const SelectPollList = styled.div`
  display: grid;
`;

export const Polls = () => {
  const [pollItems, setPollItems] = useState<IPoll[]>([]);
  const [pollResults, setPollResults] = useState<IPollResults>({ pollId: "" });
  const [pollResultsViewOpen, setPollResultsViewOpen] = useState<boolean>(
    false
  );

  const updatePolls = () => {
    apiService.getAllPolls().then((polls: IPoll[]) => {
      setPollItems(polls);
    });
  };

  useEffect(() => {
    updatePolls();
  }, []);

  const pollResultsView = (pollResults: IPollResults) => {
    const PollView = styled.div``;
    return (
      <PollView>
        <p>poll results view</p>
        {pollResults.pollId}
        <button
          onClick={(e: any) => {
            setPollResultsViewOpen(false);
          }}
        >
          close
        </button>
      </PollView>
    );
  };

  return (
    <div>
      <div>
        <div>
          <h3>Select Poll</h3>
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
                <button>Votes</button>
                <button
                  onClick={(e: any) => {
                    console.log("A", poll._id);
                    // need to set the pollResult to the pollId for the API service
                    // setPollResults(pollResults.pollId)
                    setPollResultsViewOpen(!pollResultsViewOpen);
                  }}
                >
                  Results
                </button>
                <button
                  onClick={(e: any) => {
                    apiService.deletePoll(poll._id).then(
                      () => {
                        updatePolls();
                      },
                      () => {
                        toast.error(`Error: ${poll.name} could not be deleted`);
                      }
                    );
                  }}
                >
                  delete
                </button>
              </nav>
              {/* {pollResultsView()} */}
            </SelectPollList>
          );
        })}
      </div>
      {console.log("B", pollResults.pollId)}
      {pollResultsViewOpen === true && pollResultsView(pollResults)}
    </div>
  );
};
