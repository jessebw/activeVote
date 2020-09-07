import React from "react";
import { render, act } from "@testing-library/react";
import { PollForm } from "../PollForm";
import APIService from "../../services/apiService";
import {GlobalState} from "../../state/globalState";
import {delay} from "../jestHelpers";
// import jest from "jest";


test("should filter song pool by chosen songs", async () => {
  APIService.getAllSongs = () => {
    return Promise.resolve([
      {
        _id: "5d26bb74e093861ab7e3e385",
        songName: "craigs other song",
        album: "silly songs",
        artist: "craaaaaig"
      },
      {
        _id: "5d26bbf2e093861ab7e3e386",
        songName: "craigs other other song",
        album: "silly songs",
        artist: "craaaaaig"
      },
      {
        _id: "5d26bc04e093861ab7e3e387",
        songName: "craigs other other other song",
        album: "silly songs",
        artist: "craaaaaig",
        image: "/images/G8geuRAtS.jpg"
      },
      {
        _id: "5d26bc1be093861ab7e3e388",
        songName: "craigs other other other other song",
        album: "silly songs",
        artist: "craaaaaig"
      },
      {
        _id: "5d26bc3ae093861ab7e3e389",
        songName: "craigs other other other other other song",
        album: "silly songs",
        artist: "craaaaaig"
      },
      {
        _id: "5d26bc4fe093861ab7e3e38a",
        songName: "craigs other other other other other song",
        album: "silly songs",
        artist: "craaaaaig"
      },
      {
        _id: "5d26bc4fe093861ab7e3e38b",
        songName: "craigs other other other other other song",
        album: "silly songs",
        artist: "craaaaaig"
      }
    ]);
  };

  var chosenSongs: HTMLElement;
  var songPool: HTMLElement;

  await act(async()=>{
    const { container } = await render(
    
      <GlobalState initialState={{config:{serverURL: "", port: "8080"}}}><PollForm
        pollName=""
        startDate={new Date()}
        endDate={new Date()}
        songIds={["5d26bb74e093861ab7e3e385", "5d26bbf2e093861ab7e3e386"]}
        savingPoll={true}
      ></PollForm></GlobalState>
    );
    chosenSongs = container.querySelector('*[data-testid="chosenSongs"]') as HTMLElement;
    songPool = container.querySelector('*[data-testid="songPool"]') as HTMLElement;
  })
  

  await delay(500);

  const testOne = songPool!.children[2].children.length;
  const testTwo = chosenSongs!.children[2].children.length;


  expect(testOne).toBe(5);
});