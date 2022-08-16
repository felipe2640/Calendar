import * as express from "express";
import { Request, Response } from "express";
import AdminAuth from "../Middleware/auth.middleware";
import AuthService from "../Services/Auth.service";

export default class AuthController {
  public router = express.Router();

  public path = "/auth/";
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router
      .route(`${this.path}login`)
      .post((req: Request, res: Response) => this.authService.login(req, res));
    this.router
      .route(`${this.path}createUser`)
      .post((req: Request, res: Response) => this.authService.create(req, res));
    this.router
      .route(`${this.path}user`)
      .get(AdminAuth, this.authService.Users);
    // this.router.get(`${this.path}logout`, this.authService.Logout);
  }
}
