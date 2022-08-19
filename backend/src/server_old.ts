const hasAuth = process.argv[2] !== "noauth";

import fs from "fs";
import bodyParser from "body-parser";
import jsonServer from "json-server";
import session from "express-session";
import * as dotenv from "dotenv";
import { iUSer } from "./Models/models.auth";

const server = jsonServer.create();
const router = jsonServer.router(__dirname + "/Json/db.json");
const userdb = JSON.parse(
  fs.readFileSync(__dirname + "/Json/users.json", { encoding: "utf-8" })
);

dotenv.config({ path: __dirname + "./../.env" });
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/calendar/:month", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

server.use(
  session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: false /*, cookie: {maxAge: 5000}*/,
  })
);

// Check if the user exists in database
function findUser({ email, password }: iUSer) {
  return userdb.users.find(
    (user: any) => user.email === email && user.password === password
  );
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = findUser({ email, password });
  if (!user) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
  } else {
    req.session.user = { name: user.name, email: user.email };
    res.status(200).json(req.session.user);
  }
});

server.get("/auth/user", (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ status: 401, message: "Not authenticated" });
  }
});

server.post("/auth/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy(function (err) {
      res.status(200).json({ message: "Signed out" });
    });
  } else {
    res.status(401).json({ status: 401, message: "Not authenticated" });
  }
});

if (hasAuth) {
  server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (!req.session.user) {
      const status = 401;
      res.status(status).json({ status, message: "Not authenticated" });
      return;
    } else {
      next();
    }
  });
}

server.use(router);
