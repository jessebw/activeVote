import httpService from './httpService'
import { IAuth, IConfig } from '../interfaces'

class UserService {
  static getInstance () {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  private static instance: UserService
  public auth?: IAuth

  private constructor () {
    this.readSessionState()
  }

  private config?: IConfig

  setConfig (config: IConfig) {
    this.config = config
  }

  readSessionState () {
    this.auth = JSON.parse(sessionStorage.getItem('auth') as string)
    return this.auth
  }

  authenticateUser (email: string, password: string) {
    return httpService
      .post(`${this.config!.serverURL}/authenticate`, {
        email: email,
        password: password
      })

      .then(defineAuth => {
        this.auth = defineAuth
        sessionStorage.setItem('auth', JSON.stringify(defineAuth))
        // console.log("token", this.auth && this.auth.token);
        return defineAuth
      })
  }
}

export default UserService.getInstance()
