import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { IEditingEvent, iUSer } from "../Models/models.auth";
import PrismaService from "./Prisma.service";
import { UsersService } from "./User.service";

export default class EventsService {
  private prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
    this.login;
    this.create;
  }
  async login(req: Request, res: Response) {
    if (!req.session.user) {
      res.status(400).send("Session is required");
    }
    const { email } = req.session.user as iUSer;

    new UsersService().eventsUSer({ email }).then((Events: any) => {
      res.status(200).json(Events);
    });
  }

  async create(req: Request, res: Response) {
    if (!req.session.user) {
      res.status(400).send("Session is required");
    }

    if (!req.body) {
      res.status(400).send("All input is required");
    }
    const Authorid = req.session.user as iUSer;
    const Event = req.body as IEditingEvent;
    const id = sign({ Authorid }, process.env.TOKEN_KEY_USER!);
    this.prismaService.CreateEvent({ Authorid, Event, id }).then(
      (value: any) => {
        res.status(200).json("Evento criado");
      },
      (e: any) => console.error(e)
    );
  }

  async edit(req: Request, res: Response) {
    if (!req.session.user) {
      res.status(400).send("Session is required");
    }

    if (!req.body) {
      res.status(400).send("All input is required");
    }
    const Authorid = req.session.user as iUSer;
    const Event = req.body as IEditingEvent;
    console.log(Event);
    this.prismaService.editingEvent({ Authorid, Event }).then(
      (value: any) => {
        res.status(200).json("Evento criado");
      },
      (e: any) => {
        console.error(e);
        res.status(400).json(e);
      }
    );
  }
}
