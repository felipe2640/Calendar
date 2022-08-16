import * as express from "express";
import { Request, Response } from "express";
import EventsService from "../Services/Events.service";
import AdminAuth from "../Middleware/auth.middleware";

export default class EventsController {
  public router = express.Router();
  public path = "/events";
  private eventsService: EventsService;

  constructor() {
    this.eventsService = new EventsService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router
      .route(`${this.path}`)
      .post((req: Request, res: Response) =>
        this.eventsService.create(req, res)
      );
    this.router.route(`${this.path}`).get(AdminAuth, this.eventsService.login);
    this.router
      .route(`${this.path}`)
      .put((req: Request, res: Response) => this.eventsService.edit(req, res));
    // this.router.get(`${this.path}logout`, this.authService.Logout);
  }
}
