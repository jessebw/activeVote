import React from "react";
import { render } from "@testing-library/react";
import { VoteButton } from "../VoteButton";

test("should have text vote", () => {
  const { container } = render(<VoteButton />);
  expect(container.textContent).toBe("Vote");
});
