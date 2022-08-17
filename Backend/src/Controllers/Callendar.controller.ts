import * as express from "express";
import { Request, Response } from "express";

import CalendarService from "../Services/Calendar.service";
import adminAuth from "../Middleware/Auth.middleware";

export default class CalendarController {
  public router = express.Router();
  public path = "/calendars";
  private calendarService: CalendarService;

  constructor() {
    this.calendarService = new CalendarService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router
      .route(`${this.path}createUser`)
      .post((req: Request, res: Response) =>
        this.calendarService.create(req, res)
      );
    this.router
      .route(`${this.path}`)
      .get(adminAuth, this.calendarService.login);
    // this.router.get(`${this.path}logout`, this.authService.Logout);
  }
}
