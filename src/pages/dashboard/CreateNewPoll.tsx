  import React, { useState, useEffect } from "react";
import { PollForm } from "../../components/PollForm";
import apiService from "../../services/apiService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { css } from "glamor";
import ReactGA from "react-ga";

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
          (data) => {
            setSavingPoll(false);
            setPollId(data._id);
            toast(`${pollName} Poll Saved`, {
              className: css({
                background: "#fff !important",
                color: "#363636 !important",
                fontWeight: "bold",
              }),
            });
            ReactGA.event({
              category: "Admin",
              action: "Create poll success",
            });
          },
          (error) => {
            toast.error(`${pollName} could not be Saved`);
            setSavingPoll(false);
            ReactGA.event({
              category: "Admin",
              action: "Create poll failure",
            });
          }
        );
      }}
    />
  );
};
