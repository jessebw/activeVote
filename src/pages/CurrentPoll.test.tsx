import React from "react";
import { render } from "@testing-library/react";
import { CurrentPoll } from "./CurrentPoll";
import apiService from "../services/apiService";

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
