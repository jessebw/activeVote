import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PollForm } from "../../components/PollForm";
import apiService from "../../services/apiService";
import { IPoll } from "../../interfaces";
import { toast } from "react-toastify";
import { css } from "glamor";
import ReactGA from "react-ga";
import styled from "styled-components";

const EditPollContainer = styled.div`
  width: 50%;
`;

export const EditPoll = () => {
  let { id } = useParams();
  const [savingPoll, setSavingPoll] = useState<boolean>(false);
  const [poll, setPoll] = useState<IPoll>();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (id) {
      apiService.getPollById(id).then((poll: IPoll) => {
        setPoll(poll);
      });
    }
  }, []);

  return (
    <EditPollContainer>
      {poll && (
        <PollForm
          pollId={poll._id}
          pollName={poll.name}
          startDate={new Date(poll.startDateTime)}
          endDate={new Date(poll.endDateTime)}
          songIds={poll.songIds}
          savingPoll={savingPoll}
          updateCallBack={(
            pollName: string,
            chosenItems: string[],
            startDate: string,
            endDate: string
          ) => {
            setSavingPoll(true);
            apiService
              .editPoll(pollName, chosenItems, startDate, endDate, poll._id)
              .then(
                () => {
                  setSavingPoll(false);
                  toast(`${pollName} Poll Edited`, {
                    className: css({
                      background: "#fff !important",
                      color: "#363636 !important",
                      fontWeight: "bold",
                    }),
                  });
                  ReactGA.event({
                    category: "Admin",
                    action: "Edit poll in success",
                  });
                },
                (error) => {
                  toast.error(`${pollName} could not be Edited`);
                  setSavingPoll(false);
                  ReactGA.event({
                    category: "Admin",
                    action: "Edit poll in failure",
                  });
                }
              );
          }}
        />
      )}
    </EditPollContainer>
  );
};
