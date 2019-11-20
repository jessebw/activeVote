import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiService";
import { IPoll } from "../../interfaces";
import styled from "styled-components";

const SelectPollList = styled.div`
  display: grid;
`;

export const Polls = () => {
  const [pollItems, setPollItems] = useState<IPoll[]>([]);

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
