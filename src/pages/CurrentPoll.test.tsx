import React from "react";
import { render } from "@testing-library/react";
import { CurrentPoll } from "./CurrentPoll";
import apiService from "../services/apiService";
import { GlobalState } from "../state/globalState";
import {delay} from "../components/jestHelpers";



describe("currentPoll", ()=>{

  beforeEach(()=>{
fetchMock.mockResponse('{"status": 200}');
  })
  test("should have display message if no current poll", () => {
    apiService.getCurrentPoll = jest
      .fn()
      .mockRejectedValue("No current polls found");
  
    const { getByTestId } = render(<CurrentPoll />);
    const currentPollDiv = getByTestId("noCurrentPoll");
    expect(currentPollDiv).toBeTruthy();
    expect(currentPollDiv.textContent).toBe(
      "Voting has finished for this Poll"
    );
  });
  
  test("should not have display message if no current poll", async () => {
    apiService.getCurrentPoll = jest.fn().mockResolvedValue({
  "_id": "5f06ef4cf462836401a0b927",
  "name": "scfscf",
  "startDateTime": "2020-07-09T10:19:36.940Z",
  "endDateTime": "2020-07-31T10:19:00.000Z",
  "lastModifiedDateTime": "2020-07-30T05:03:36.931Z",
  "createdDateTime": "2020-07-09T10:19:56.748Z",
  "songIds": [
    "5ed86790f462836401a0b914",
    "5ed86813f462836401a0b919",
    "5ed8677cf462836401a0b913"
  ],
  "songs": [
    {
      "_id": "5ed8677cf462836401a0b913",
      "songName": "Mud & Stardust",
      "album": "",
      "artist": "Fly My Pritties",
      "image": "/images/5zu9hYoWE.jpg"
    },
    {
      "_id": "5ed86790f462836401a0b914",
      "songName": "Shallows",
      "album": "",
      "artist": "Doons",
      "image": "/images/jviCZU_ug.jpg"
    },
    {
      "_id": "5ed86813f462836401a0b919",
      "songName": "The News",
      "album": "",
      "artist": "Giantess",
      "image": "/images/SfSRSn4y3.jpg"
    }
  ]

    });
  
    const { queryByTestId } = render( <GlobalState initialState={{config:{serverURL: "", port: "8080"}}}><CurrentPoll /></GlobalState>);
    
    await delay(500)
    
    // console.log(document.body.innerHTML);
    expect(await queryByTestId("noCurrentPoll")).toBeNull();
  });
  
})


