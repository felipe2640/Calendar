declare module "express-session" {
  export interface SessionData {
    user: iUSer;
  }
}

export interface iUSer {
  email: string;
  name: string;
  token: string;
  authorId: string;
}

export interface ICreateUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface ICalendar {
  id: string;
  name: string;
  color: string;
}

export interface IEditingEvent {
  id?: string;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: string;
}
