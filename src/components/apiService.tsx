import httpService from "./httpService";
// import { string } from "prop-types";

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

  getPollById(id: string) {
    return httpService.get("http://activevoteserver.deverall.co.nz/poll/" + id);
  }

  postSubmitVote(email: string, songId: string, pollId: string) {
    return httpService.post("http://activevoteserver.deverall.co.nz/vote", {
      email: email,
      songId: songId,
      pollId: pollId,
    });
  }
}

export default APIService.getInstance();
