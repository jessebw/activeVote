import httpService from "./httpService";
import { INewSong, INewUser } from "../interfaces";
import configService from "./configService";

class APIService {
  static getInstance() {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  private static instance: APIService;

  private constructor() {
    // default for all requests
  }

  getAllVotes() {
    return httpService.get(configService.getConfig()!.serverURL + "/vote");
  }

  getCurrentPoll() {
    return httpService.get(
      configService.getConfig()!.serverURL + "/currentpoll/"
    );
  }

  getAllPolls() {
    return httpService.get(configService.getConfig()!.serverURL + "/poll/");
  }

  getPollById(id: string) {
    return httpService.get(
      configService.getConfig()!.serverURL + "/poll/" + id
    );
  }

  getAllSongs() {
    return httpService.get(configService.getConfig()!.serverURL + "/song");
  }

  deleteSong(songId: string): any {
    return httpService.delete(
      configService.getConfig()!.serverURL + "/" + songId
    );
  }

  addNewSong(song: INewSong) {
    return httpService.post(
      configService.getConfig()!.serverURL + "/song",
      song
    );
  }

  postSubmitVote(email: string, songId: string, pollId: string) {
    return httpService.post(configService.getConfig()!.serverURL + "/vote", {
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
    return httpService.post(configService.getConfig()!.serverURL + "/poll", {
      name: name,
      songIds: songIds,
      startDateTime: startDateTime,
      endDateTime: endDateTime
    });
  }

  deletePoll(pollId: string) {
    return httpService.delete(
      `${configService.getConfig()!.serverURL}/poll/${pollId}`
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
      `${configService.getConfig()!.serverURL}/poll/${pollId}`,
      {
        name: name,
        songIds: songIds,
        startDateTime: startDateTime,
        endDateTime: endDateTime
      }
    );
  }
  addNewUser(newUser: INewUser) {
    return httpService.post(
      `${configService.getConfig()!.serverURL}/user`,
      newUser
    );
  }

  uploadImage(blob: Blob) {
    return httpService.postFormData(
      `${configService.getConfig()!.serverURL}/album-art-upload`,
      blob
    );
  }

  pollResults(pollId: string) {
    return httpService.get(
      `${configService.getConfig()!.serverURL}/poll/${pollId}/results`
    );
  }

  deleteUser(email: string) {
    return httpService.delete(`${configService.getConfig()!.serverURL}/user`, {
      email: email
    });
  }
  getAllUsers() {
    return httpService.get(`${configService.getConfig()!.serverURL}/user`);
  }
}

export default APIService.getInstance();
