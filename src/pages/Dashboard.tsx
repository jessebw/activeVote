import React, { useEffect, useState } from "react";
import ApiService from "../components/apiService";
import { IVote } from "../interfaces";
import { useStateValue } from "../state/stateContext";

export const Dashboard = () => {
  // const x = useState();
  const [listVotes, setListVotes] = useState<IVote[]>([]);
  const [globalState, dispatch] = useStateValue();
  useEffect(() => {
    ApiService.getAllVotes().then(data => {
      setListVotes(data);
    });
  }, []);

  return (
    <div>
      {listVotes.map((vote: IVote, i: number) => {
        return <p key={vote._id}>{vote.email}</p>;
        // console.log("vote ID", vote._id);
      })}

      <button
        onClick={(e: any) => {
          sessionStorage.removeItem("auth");
          dispatch({ type: "setAuth", payload: undefined });
        }}
      >
        logout
      </button>
    </div>
  );
};
