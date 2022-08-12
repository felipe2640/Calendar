import React, { useContext } from "react";
import { IUser } from "./backend";

// export const userContext = React.createContext<IUser>({
//   name: "Anonimo",
//   email: "",
// });

// export const signOutContext = React.createContext<() => void>(() => {});

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: "Anonimo",
    email: "",
  },
  onSignOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
