class HttpService {
  static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private static instance: HttpService;

  private constructor() {
    // default for all requests
  }

  get(url: string) {
    return fetch(url).then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      return response.json().then(data => {
        console.log(data);
        return data;
      });
    });
  }

  //   put() {};

  //   post() {};

  //   delete(){};
}

export default HttpService.getInstance();
