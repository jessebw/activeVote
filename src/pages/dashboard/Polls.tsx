import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiService";
import { IPoll, IPollResult } from "../../interfaces";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const SelectPollList = styled.div`
  display: grid;
`;

export const Polls = () => {
  const [pollItems, setPollItems] = useState<IPoll[]>([]);
  const [showResultsFor, setShowResultsFor] = useState<string>();
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

  if (showResultsFor) {
    return <Redirect to="/dashboard/results/{showResultsFor}"></Redirect>;
  }

  return (
    <div>
      <div>
        <div>
          <h3>Select Poll</h3>
        </div>
        {pollItems.map((poll: IPoll) => {
          return (
            <SelectPollList key={poll._id}>
              <p>{`${poll.name} - ${poll.createdDateTime}`}</p>
              <nav>
                <Link to={"/dashboard/editpoll/" + poll._id}>
                  <button>edit</button>
                </Link>
                <button>Votes</button>
                <button
                  onClick={(e: any) => {
                    setShowResultsFor(poll._id);
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
            </SelectPollList>
          );
        })}
      </div>
    </div>
  );
};
