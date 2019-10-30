import React from "react";
import { PollForm } from "../../components/PollForm";
import apiService from "../../services/apiService";

export const CreateNewPoll = () => {
  return (
    <PollForm
      pollName={""}
      startDate={new Date()}
      endDate={new Date()}
      songIds={[]}
      updateCallBack={(pollName, chosenItems, startDate, endDate) => {
        apiService.addNewPoll(pollName, chosenItems, startDate, endDate);
      }}
    />
  );
  // return <div></div>;
};
