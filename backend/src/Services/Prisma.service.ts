import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import {
  ICalendar,
  ICreateUser,
  IEditingEvent,
  IEvent,
  iUSer,
} from "../Models/models.auth";

export const prisma = new PrismaClient();

export default class PrismaService {
  constructor() {}

  async Users({ email }: { email: string }): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } }).then(
      (value: any) => value,
      (err: any) => err
    );
    return user;
  }
  async CreateUser(user: ICreateUser): Promise<any> {
    await prisma.user
      .create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
          calendars: {
            create: [
              {
                id: "37f204a28ec65e5bc55c79d5b313eebf4ab135541b2b2ece0a110fd6a894c0f25a42ef",
                name: "Pessoal",
                color: "#8E24AA",
              },
              {
                id: "51b600f71d44d57bede038f76b0b59fdd98daba0a651de49f8e0393f04770f2b755656",
                name: "Trabalho",
                color: "#7CB342",
              },
            ],
          },
        },
      })
      .then(
        (value: any) => value,
        (err: any) => console.log(err)
      );
  }

  async Events({ email }: { email: string }): Promise<IEvent[] | undefined> {
    const events = await prisma.user
      .findMany({
        where: { email },
        select: {
          events: true,
        },
      })
      .then(
        (value: any) => value[0].events,
        (err: any) => console.log(err)
      );
    return events;
  }

  async CreateEvent({
    Authorid,
    Event,
    id,
  }: {
    Authorid: iUSer;
    Event: IEditingEvent;
    id: string;
  }): Promise<any> {
    await prisma.events
      .create({
        data: {
          id: id,
          date: Event.date,
          time: Event.time,
          desc: Event.desc,
          calendarId: Event.calendarId,
          authorId: Authorid.authorId,
        },
      })
      .then(
        (value: any) => value,
        (err: any) => console.log(err)
      );
  }
  async editingEvent({
    Authorid,
    Event,
  }: {
    Authorid: iUSer;
    Event: IEditingEvent;
  }): Promise<any> {
    await prisma.events
      .update({
        where: {
          id: Event.id,
        },
        data: {
          id: Event.id,
          date: Event.date,
          time: Event.time,
          desc: Event.desc,
          calendarId: Event.calendarId,
          authorId: Authorid.authorId,
        },
      })
      .then(
        (value: any) => value,
        (err: any) => console.log(err)
      );
  }
  async Calendars({
    email,
  }: {
    email: string;
  }): Promise<ICalendar[] | undefined> {
    const calendars = await prisma.user
      .findMany({
        where: { email },
        select: {
          calendars: true,
        },
      })
      .then(
        (value: any) => value[0].calendars,
        (err: any) => console.log(err)
      );
    return calendars;
  }
  async CreateCalendar({
    Authorid,
    Calendar,
    id,
  }: {
    Authorid: iUSer;
    Calendar: ICalendar;
    id: string;
  }): Promise<any> {
    await prisma.calendars
      .create({
        data: {
          id: id,
          name: Calendar.name,
          color: Calendar.color,
          authorId: Authorid.authorId,
        },
      })
      .then(
        (value: any) => value,
        (err: any) => console.log(err)
      );
  }

  async Middleware() {
    prisma.$use(async (params:any, next:any) => {
      // Manipulate params here
      const result = await next(params);
      // See results here
      return result;
    });
  }
}
