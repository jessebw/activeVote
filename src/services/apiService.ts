import httpService from "./httpService";
import { ISong, INewSong } from "../interfaces";

class APIService {
  static getInstance() {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }

    return APIService.instance;
  }

  dummyURL = "http://activevoteserver.deverall.co.nz/";

  private static instance: APIService;

  private constructor() {
    // default for all requests
  }

  getAllVotes() {
    return httpService.get(this.dummyURL + "vote");
  }

  getCurrentPoll() {
    return httpService.get(
      "http://activevoteserver.deverall.co.nz/currentpoll/"
    );
  }

  getAllPolls() {
    return httpService.get("http://activevoteserver.deverall.co.nz/poll/");
  }

  getPollById(id: string) {
    return httpService.get("http://activevoteserver.deverall.co.nz/poll/" + id);
  }

  getAllSongs() {
    return httpService.get("http://activevoteserver.deverall.co.nz/song");
  }

  deleteSong(songId: string): any {
    return httpService.delete(
      `http://activevoteserver.deverall.co.nz/song/${songId}`
    );
  }

  addNewSong(song: INewSong) {
    return httpService.post(
      "http://activevoteserver.deverall.co.nz/song",
      song
    );
  }

  postSubmitVote(email: string, songId: string, pollId: string) {
    return httpService.post("http://activevoteserver.deverall.co.nz/vote", {
      email: email,
      songId: songId,
      pollId: pollId
    });
  }
  addNewPoll(
    name: string,
    songIds: string[],
    startDateTime: string,
    endDateTime: string
  ) {
    return httpService.post("http://activevoteserver.deverall.co.nz/poll", {
      name: name,
      songIds: songIds,
      startDateTime: startDateTime,
      endDateTime: endDateTime
    });
  }

  deletePoll(pollId: string) {
    return httpService.delete(
      `http://activevoteserver.deverall.co.nz/poll/${pollId}`
    );
  }

  editPoll(
    name: string,
    songIds: string[],
    startDateTime: string,
    endDateTime: string,
    pollId: string
  ) {
    return httpService.put(
      `http://activevoteserver.deverall.co.nz/poll/${pollId}`,
      {
        name: name,
        songIds: songIds,
        startDateTime: startDateTime,
        endDateTime: endDateTime
      }
    );
  }
}

export default APIService.getInstance();
