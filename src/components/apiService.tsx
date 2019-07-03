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
  poo() {}
}

export default APIService.getInstance();
