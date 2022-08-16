import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { ICalendar, iUSer } from "../Models/models.auth";
import { UsersService } from "./User.service";
import PrismaService from "./Prisma.service";

export default class CalendarService {
  private prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
    this.login;
    this.create;
  }

  async create(req: Request, res: Response) {
    if (!req.session.user) {
      res.status(400).send("Session is required");
    }

    if (!req.body) {
      res.status(400).send("All input is required");
    }

    const Authorid = req.session.user as iUSer;
    const Calendar = req.body as ICalendar;
    const id = sign({ Authorid }, process.env.TOKEN_KEY_USER!);
    this.prismaService.CreateCalendar({ Authorid, Calendar, id }).then(
      (value: any) => {
        res.status(200).json("Evento criado");
      },
      (e: any) => console.error(e)
    );
  }
  async login(req: Request, res: Response) {
    if (!req.session.user) {
      res.status(400).send("All input is required");
    }
    const { email } = req.session.user as iUSer;

    new UsersService().calendarsUSer({ email }).then((Calendars: any) => {
      res.status(200).json(Calendars);
    });
  }
}
