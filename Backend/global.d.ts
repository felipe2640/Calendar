declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production";
      TOKEN_KEY: string;
      TOKEN_KEY_USER: string;
    }
  }
}

export {};
