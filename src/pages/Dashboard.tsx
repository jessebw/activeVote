import React, { useEffect, useState } from "react";
import ApiService from "../components/apiService";
import { IVote } from "../interfaces";

export const Dashboard = () => {
  // const x = useState();
  const [listVotes, setListVotes] = useState<IVote[]>([]);
  useEffect(() => {
    ApiService.getAllVotes().then(data => {
      setListVotes(data);
    });
  }, []);

  return (
    <div>
      {listVotes.map((vote: IVote, i: number) => {
        return <p>{vote.email}</p>;
      })}
    </div>
  );
};

// const changeState: TStateAction = {
//   type: "setAuth",
//   payload: sessionState,
// };
// dispatch(changeState);
// // }

// voteItems.map((voteItem: IVoteItem, i: number) => {
//   return (
//     <VoteItemWrapper key={i} data={voteItem} onVote={buttonClicked} />
//   );
