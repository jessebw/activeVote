import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/apiService";
import { IPoll } from "../../interfaces";

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
        <h3>Select Poll</h3>
        {pollItems.map((poll: IPoll) => {
          return (
            <div key={poll._id}>
              <p>{poll.name}</p>
              <p>{poll.createdDateTime}</p>
              <nav>
                <Link to={"/dashboard/editpoll/" + poll._id}>
                  <button>edit</button>
                </Link>
              </nav>
            </div>
          );
        })}
      </div>
    </div>
  );
};
