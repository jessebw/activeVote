import httpService from "./httpService";

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

  getCurrentPoll() {
    return httpService.get(
      "http://activevoteserver.deverall.co.nz/currentpoll/"
    );
  }

  getPollById(id: string) {
    return httpService.get("http://activevoteserver.deverall.co.nz/poll/" + id);
  }
}

export default APIService.getInstance();
