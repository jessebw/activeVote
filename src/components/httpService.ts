import fetchIntercept from "fetch-intercept";

// fetchIntercept.register({
//   request: function(url, config) {
//     // Modify the url or config here
//     // const authorization = config.headers.{authorization}
//     const auth = localStorage.getItem("auth");
//     console.log("auth", auth);
//     if (auth !== "undefined") {
//       config.headers.Authorization =
//         "Bearer " + JSON.parse(auth as string).token;
//       console.log("D", config);
//     }
//     return [url, config];
//   },

//   requestError: function(error) {
//     // Called when an error occured during another 'request' interceptor call
//     return Promise.reject(error);
//   },

//   response: function(response) {
//     // Modify the reponse object
//     return response;
//   },

//   responseError: function(error) {
//     // Handle an fetch error
//     return Promise.reject(error);
//   },
// });

class HttpService {
  static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    console.log("httpService Instance Given");
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

  post(url: string, bodyData: any) {
    return fetch(url, {
      body: JSON.stringify(bodyData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function(response) {
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

  //   delete(){};
}

export default HttpService.getInstance();
