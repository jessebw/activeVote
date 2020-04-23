import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiService";
import { IPoll, IPollResult, IVote, ISong } from "../../interfaces";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import moment from "moment";
import ReactGA from "react-ga";

const SelectPollList = styled.div`
  display: grid;
  &.active {
    background-color: #000;
    color: #fff;
  }
`;

const PollResultsContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

interface ISongVote extends IVote {
  songName: string;
}

export const Polls = () => {
  const [pollItems, setPollItems] = useState<IPoll[]>([]);
  const [resultsPoll, setResultsPoll] = useState<IPoll>();
  const [activePoll, setActivePoll] = useState<IPoll>();
  const [votes, setVotes] = useState<IVote[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);
  const [activePollVotes, setActivePollVotes] = useState<ISongVote[]>([]);

  const updatePolls = () => {
    return apiService.getAllPolls().then((polls: IPoll[]) => {
      setPollItems(polls);
    });
  };

  const getAllVotes = () => {
    return apiService.getAllVotes().then((votes: IVote[]) => {
      setVotes(votes);
    });
  };

  const getAllSongs = () => {
    return apiService.getAllSongs().then((songs: ISong[]) => {
      setSongs(songs);
    });
  };

  useEffect(() => {
    // ReactGA.pageview(window.location.pathname + window.location.search);
    updatePolls();
    getAllVotes();
    getAllSongs();
  }, []);

  if (resultsPoll) {
    return <Redirect to={`/dashboard/results/${resultsPoll._id}`} />;
  }

  return (
    <div>
      <div>
        <div>
          <h3>Select Poll</h3>
        </div>
        {pollItems.map((poll: IPoll) => {
          return (
            <SelectPollList
              key={poll._id}
              className={
                activePoll && activePoll._id === poll._id ? "active" : ""
              }
            >
              <p
                onClick={(e: any) => {
                  setActivePoll(poll);
                  setActivePollVotes(
                    votes
                      .filter((vote) => {
                        return vote.pollId === poll._id;
                      })
                      .map((vote) => {
                        return {
                          ...vote,
                          songName: songs.reduce((acc, song) => {
                            if (song._id === vote.songId) {
                              return song.songName;
                            } else {
                              return acc;
                            }
                          }, ""),
                        };
                      })
                  );
                }}
              >
                {`${poll.name} - ${moment(
                  poll.createdDateTime,
                  moment.defaultFormat
                ).toDate()}`}
              </p>
              <nav>
                <Link to={"/dashboard/editpoll/" + poll._id}>
                  <button
                    onClick={(e: any) => {
                      ReactGA.event({
                        category: "Admin",
                        action: "Editpoll Clicked from polls menu",
                      });
                    }}
                  >
                    edit
                  </button>
                </Link>
                <button
                  onClick={(e: any) => {
                    ReactGA.event({
                      category: "Admin",
                      action: "Vote Users Clicked from polls menu",
                    });
                  }}
                >
                  Votes
                </button>
                <button
                  onClick={(e: any) => {
                    ReactGA.event({
                      category: "Admin",
                      action: "Poll Results Clicked from polls menu",
                    });
                    setResultsPoll(poll);
                  }}
                >
                  Results
                </button>
                <button
                  onClick={(e: any) => {
                    ReactGA.event({
                      category: "Admin",
                      action: "Poll delete success",
                    });
                    apiService.deletePoll(poll._id).then(
                      () => {
                        updatePolls();
                      },
                      () => {
                        ReactGA.event({
                          category: "Admin",
                          action: "Poll delete in failure",
                        });
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
      {activePoll && (
        <PollResultsContainer>
          <h4>{activePoll.name} - Voters</h4>
          {activePollVotes.map((vote) => {
            return (
              <React.Fragment>
                <p>
                  {vote.email} - {vote.songName}
                </p>
              </React.Fragment>
            );
          })}
        </PollResultsContainer>
      )}
    </div>
  );
};
