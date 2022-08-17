import * as express from "express";
import { Request, Response } from "express";

import AdminAuth from "../Middleware/Auth.middleware";
import AuthService from "../Services/Auth.service";

export default class UserController {
  public router = express.Router();
  public path = "/user/";
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router
      .route(`${this.path}createUser`)
      .post((req: Request, res: Response) => this.authService.create(req, res));
    this.router.route(`${this.path}`).get(AdminAuth, this.authService.Users);
  }
}
