import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PollForm } from "../../components/PollForm";
import apiService from "../../services/apiService";
import { IPoll } from "../../interfaces";

export const EditPoll = () => {
  let { id } = useParams();

  const [poll, setPoll] = useState<IPoll>();
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();

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
          pollName={poll.name}
          startDate={new Date(poll.startDateTime)}
          endDate={new Date(poll.endDateTime)}
          songIds={poll.songIds}
          updateCallBack={(
            pollName: string,
            chosenItems: string[],
            startDate: string,
            endDate: string
          ) => {
            apiService.editPoll(
              pollName,
              chosenItems,
              startDate,
              endDate,
              poll._id
            );
          }}
        />
      )}
    </div>
  );
};

// function Child() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let { id } = useParams();

//   return (
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   );
// }
