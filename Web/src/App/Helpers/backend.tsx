export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export interface IUser {
  email: string;
  name: string;
  token: string;
  authorId: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
export const configBackend: string = process.env
  .REACT_APP_CONFIGURATION_BACKEND as string;

export function getCalendarEndpoint(): Promise<ICalendar[]> {
  return fetch(`${configBackend}calendars`, {
    credentials: "include",
  }).then(handleResponse);
}

export function getEventEndpoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `${configBackend}events?date_gte=${from}&date_lte${to}&_sort=date,time`,
    { credentials: "include" }
  ).then(handleResponse);
}

export function createEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`${configBackend}events`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function updateEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`${configBackend}events`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function deleteEventEndpoint(eventId: number): Promise<void> {
  return fetch(`${configBackend}events/${eventId}`, {
    credentials: "include",
    method: "DELETE",
  }).then(handleResponse);
}

export function getUserEndpoint(): Promise<void> {
  return fetch(`${configBackend}user`, {
    credentials: "include",
  }).then(handleResponse);
}

export function signInEndpoint(
  email: string,
  password: string
): Promise<IUser> {
  return fetch(`${configBackend}auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function createUserEndpoint(
  email: string,
  password: string,
  name: string
): Promise<void> {
  return fetch(`${configBackend}user/createUser`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then(handleResponse);
}

export function signOutEndpoint(): Promise<IUser> {
  return fetch(`${configBackend}auth/logout`, {
    credentials: "include",
    method: "POST",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
