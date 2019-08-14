import httpService from "./httpService";
import { IAuth } from "../interfaces";

class UserService {
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  private static instance: UserService;
  public auth?: IAuth;

  private constructor() {
    this.auth = JSON.parse(sessionStorage.getItem("auth") as string);
  }

  authenticateUser(email: string, password: string) {
    return httpService
      .post("http://activevoteserver.deverall.co.nz/authenticate", {
        email: email,
        password: password,
      })

      .then(defineAuth => {
        this.auth = defineAuth;
        sessionStorage.setItem("auth", JSON.stringify(defineAuth));
        console.log("token", this.auth && this.auth.token);
        return defineAuth;
      });
  }
}

export default UserService.getInstance();
