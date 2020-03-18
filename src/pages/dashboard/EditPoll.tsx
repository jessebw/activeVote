import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PollForm } from "../../components/PollForm";
import apiService from "../../services/apiService";
import { IPoll } from "../../interfaces";
import { toast } from "react-toastify";

export const EditPoll = () => {
  let { id } = useParams();
  const [savingPoll, setSavingPoll] = useState<boolean>(false);
  const [poll, setPoll] = useState<IPoll>();

  useEffect(() => {
    if (id) {
      apiService.getPollById(id).then((poll: IPoll) => {
        setPoll(poll);
      });
    }
  }, []);

  return (
    <div>
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
                  toast.success(`${pollName} poll list Edited`);
                },
                error => {
                  toast.error(`${pollName} could not be Edited`);
                  setSavingPoll(false);
                }
              );
          }}
        />
      )}
    </div>
  );
};
