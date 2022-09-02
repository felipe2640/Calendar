import bodyParser from "body-parser";
import jsonServer from "json-server";
import morgan from "morgan";
import session from "express-session";
import cors from "cors";

import App from "./src/app.config";
import AuthController from "./src/Controllers/Auth.controller";
import CalendarController from "./src/Controllers/Callendar.controller";
import EventsController from "./src/Controllers/Events.controller";
import UserController from "./src/Controllers/User.controller";

const app = new App({
  port: process.env.PORT!,
  middlewares: [
    morgan("dev"),
    cors({
      origin: `${process.env.CORS_URL}`,
      credentials: true,
    }),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    session({
      secret: `${process.env.SECRET_KEY}`,
      resave: false,
      saveUninitialized: false /*, cookie: {maxAge: 5000}*/,
    }),
  ],
  controllers: [
    new AuthController(),
    new CalendarController(),
    new EventsController(),
    new UserController(),
  ],
});

app.listen();
