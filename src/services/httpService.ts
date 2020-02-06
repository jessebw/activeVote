import fetchIntercept from 'fetch-intercept'
import userService from './userService'
import jwtDecode from 'jwt-decode'

fetchIntercept.register({
  request: function (url, config = {}) {
    const auth = userService.auth
    // console.log("auth", auth);
    // console.log("authConfig:", config);
    if (auth) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + auth.token
      }
      // console.log('token', auth.token)
    }
    return [url, config]
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error)
  },

  response: function (response) {
    // Modify the reponse objectteam
    // console.log("response", response);
    return response
  },
  responseError: function (error) {
    // Handle an fetch error
    return Promise.reject(error)
  }
})

class HttpService {
  static getInstance () {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService()
    }
    // console.log('httpService Instance Given')
    return HttpService.instance
  }

  private static instance: HttpService

  private constructor () {
    // default for all requests
  }

  get (url: string) {
    return fetch(url).then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )

        if (response.status === 401) {
          const auth = JSON.parse(sessionStorage.getItem('auth') as string)
          const decoded: any = jwtDecode(auth.token)
          console.log('decoded token', decoded)

          return HttpService.getInstance()
            .post('http://activevoteserver.deverall.co.nz/refreshtoken', {
              email: decoded.email,
              refreshToken: auth.refreshToken
            })
            .then(data => {
              sessionStorage.setItem('auth', JSON.stringify(data))
              // console.log("token", this.auth && this.auth.token);
              userService.readSessionState()
              return fetch(url).then(successfullResponse => {
                return successfullResponse.json().then(data => {
                  console.log('refreshed Token', data)
                  return data
                })
              })
            })
        }

        return Promise.reject()
      }

      return response.json().then(data => {
        // console.log(data)
        return data
      })
    })
  }

  post (url: string, bodyData: any) {
    return fetch(url, {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error(
          'Looks like there was a problem. Status Code: ' + response.status
        )
      }
      return response.json().then(data => {
        // console.log(data)
        return data
      })
    })
  }

  put (url: string, bodyData: any) {
    return fetch(url, {
      body: JSON.stringify(bodyData),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }
      return response.json().then(data => {
        // console.log(data)
        return data
      })
    })
  }

  delete (url: string) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error(
          'Looks like there was a problem. Status Code: ' + response.status
        )
      }
      return 'Successfully Deleted all of your data'
    })
  }
}

export default HttpService.getInstance()
