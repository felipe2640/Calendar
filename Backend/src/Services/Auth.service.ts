import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

import { UsersService } from "./User.service";
import { ICreateUser } from "../Models/models.auth";

export default class AuthService {
  private userService: UsersService;

  constructor() {
    this.userService = new UsersService();
    this.create;
    this.login;
  }

  public async create(req: Request, res: Response) {
    const { email, password, name } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const Hash = await hash(password, 10);
    const id = sign({ name, email }, process.env.TOKEN_KEY_USER!);
    const CreateUser = { id, email, name, password: Hash };

    try {
      this.userService.createOne({ CreateUser }).then((value) => {
        res.status(201);
      });
    } catch (error) {
      console.error(error);
    }
  }
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    try {
      this.userService
        .findOne({ email })
        .then((user: ICreateUser | undefined) => {
          if (!user) {
            res.status(400).json({
              message: "Login not successful",
              error: "User not found",
            });
          } else {
            compare(password, user.password).then(function (result) {
              if (result) {
                const maxAge = 3 * 60 * 60;
                const token = sign(
                  { id: user.name, email },
                  process.env.TOKEN_KEY!,
                  {
                    expiresIn: maxAge, // 3hrs in sec
                  }
                );
                req.session.user = {
                  name: user.name,
                  email: user.email,
                  token,
                  authorId: user.id,
                };
                res.status(201).json(req.session.user);
              } else {
                res.status(400).json({ message: "Login not successful" });
              }
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  }
  public async Users(req: Request, res: Response) {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(401).json({ status: 401, message: "Not authenticated" });
    }
  }
}
