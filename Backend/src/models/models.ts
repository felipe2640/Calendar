declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export interface iUSer {
  email: string;
  password: string;
}

export interface iEnv {
  PORT: string;
}
