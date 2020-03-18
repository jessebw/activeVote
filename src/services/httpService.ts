import fetchIntercept from "fetch-intercept";
import userService from "./userService";
import jwtDecode from "jwt-decode";
import configService from "./configService";
import { toast } from "react-toastify";
import history from "../history";

fetchIntercept.register({
  request: function(url, config = {}) {
    const auth = userService.auth;
    if (auth) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + auth.token
      };
    }
    return [url, config];
  },

  requestError: function(error) {
    return Promise.reject(error);
  },

  response: function(response) {
    return response;
  },
  responseError: function(error) {
    return Promise.reject(error);
  }
});

class HttpService {
  static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    // console.log('httpService Instance Given')
    return HttpService.instance;
  }

  private static instance: HttpService;

  private constructor() {
    // default for all requests
  }

  refreshToken() {
    const auth = JSON.parse(sessionStorage.getItem("auth") as string);
    const decoded: any = jwtDecode(auth.token);
    return HttpService.getInstance()
      .post(`${configService.getConfig()!.serverURL}/refreshtoken`, {
        email: decoded.email,
        refreshToken: auth.refreshToken
      })
      .then(
        data => {
          sessionStorage.setItem("auth", JSON.stringify(data));
          userService.readSessionState();
        },
        error => {
          sessionStorage.removeItem("auth");
          history.push("/login");
        }
      );
  }

  get(url: string) {
    const _this = this;
    return fetch(url).then(function(response) {
      if (response.status !== 200) {
        if (response.status === 401) {
          return _this.refreshToken().then(() => {
            return fetch(url).then(successfullResponse => {
              return successfullResponse.json().then(data => {
                return data;
              });
            });
          });
        }
        return Promise.reject(response);
      }

      return response.json().then(data => {
        return data;
      });
    });
  }

  post(url: string, bodyData: any): Promise<any> {
    const _this = this;
    const options = {
      body: JSON.stringify(bodyData),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };
    return fetch(url, options).then(function(response) {
      if (response.status !== 200) {
        if (response.status === 401) {
          return _this.refreshToken().then(() => {
            return fetch(url, options).then(successfullResponse => {
              return successfullResponse.json().then(data => {
                return data;
              });
            });
          });
        }
        return Promise.reject(response);
      }
      return response.json().then(data => {
        return data;
      });
    });
  }

  postFormData(url: string, bodyData: any) {
    return fetch(url, {
      body: bodyData,
      method: "POST"
    }).then(function(response) {
      if (response.status !== 200) {
        return Promise.reject(response);
      }

      return response.json().then(data => {
        return data;
      });
    });
  }

  put(url: string, bodyData: any) {
    const _this = this;
    const options = {
      body: JSON.stringify(bodyData),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    };
    return fetch(url, options).then(function(response) {
      if (response.status !== 200) {
        if (response.status === 401) {
          return _this.refreshToken().then(() => {
            return fetch(url, options).then(successfullResponse => {
              return successfullResponse.json().then(data => {
                return data;
              });
            });
          });
        }
        return Promise.reject(response);
      }
      return response.json().then(data => {
        return data;
      });
    });
  }

  delete(url: string, body?: any) {
    const _this = this;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(function(response) {
      if (response.status !== 200) {
        if (response.status === 401) {
          return _this.refreshToken().then(() => {
            return fetch(url, options).then(successfullResponse => {
              return successfullResponse.json().then(data => {
                return data;
              });
            });
          });
        }
        return Promise.reject(response);
      }
      return "Successfully Deleted all of your data";
    });
  }
}

export default HttpService.getInstance();
