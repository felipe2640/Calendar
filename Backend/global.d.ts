declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production";
      SECRET_KEY: string;
    }
  }
}

export {};
