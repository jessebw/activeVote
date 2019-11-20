import React, { useState } from "react";
import { PollForm } from "../../components/PollForm";
import apiService from "../../services/apiService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const CreateNewPoll = () => {
  const [pollId, setPollId] = useState<string>();
  const [savingPoll, setSavingPoll] = useState<boolean>(false);

  if (pollId) {
    return <Redirect to={`/dashboard/editpoll/${pollId}`} />;
  }

  return (
    <PollForm
      pollName={""}
      startDate={new Date()}
      endDate={new Date()}
      songIds={[]}
      savingPoll={savingPoll}
      updateCallBack={(pollName, chosenItems, startDate, endDate) => {
        setSavingPoll(true);
        apiService.addNewPoll(pollName, chosenItems, startDate, endDate).then(
          data => {
            setSavingPoll(false);
            setPollId(data._id);
            toast.success(`${pollName} poll list Saved`);
          },
          error => {
            toast.error(`${pollName} could not be Saved`);
            setSavingPoll(false);
          }
        );
      }}
    />
  );
};
