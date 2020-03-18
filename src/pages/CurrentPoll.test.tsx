import React from "react";
import { render } from "@testing-library/react";
import { CurrentPoll } from "./CurrentPoll";
import apiService from "../services/apiService";
// import jest from "jest";

test("should have display message if no current poll", () => {
  apiService.getCurrentPoll = jest
    .fn()
    .mockRejectedValue("No current polls found");

  const { getByTestId } = render(<CurrentPoll />);
  const currentPollDiv = getByTestId("noCurrentPoll");
  expect(currentPollDiv).toBeTruthy();
  expect(currentPollDiv.textContent).toBe(
    "No Current Pollsplaceholder - logo here"
  );
});

test("should not have display message if no current poll", async () => {
  apiService.getCurrentPoll = jest.fn().mockResolvedValue({
    _id: "5d2b8bcd49046144f01e39eb",
    name: "craigs current top 11",
    startDateTime: "2019-07-13T20:08:24.621Z",
    endDateTime: "2019-07-18T20:08:24.621Z",
    lastModifiedDateTime: "2019-07-25T05:59:59.760Z",
    createdDateTime: "2019-07-14T20:08:45.009Z",
    songIds: [
      "5ce5211e01fcfc66f8103f2d",
      "5cd27561f9272f625cad5bba",
      "5ce520fc01fcfc66f8103f2c"
    ]
  });

  const { getByTestId } = render(<CurrentPoll />);
  const currentPollDiv = getByTestId("noCurrentPoll");
  expect(currentPollDiv).toBeFalsy();
});
