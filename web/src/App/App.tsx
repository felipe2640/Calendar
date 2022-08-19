import React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { getUserEndpoint, IUser } from "./Helpers/backend";
import CalendarScreen from "./Components/CalendarScreen";
import { getToday } from "./Helpers/dateFunctions";
import LoginScreen from "./Components/LoginScreen";
import { authContext } from "./Helpers/authContext";
import CreateScreen from "./Components/CreateScreen";

function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null | void>(null);

  const [formScreen, SetFormScreen] = useState(true);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    SetFormScreen(true);
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Routes>
            <Route path="/calendar/:month" element={<CalendarScreen />} />
            <Route
              path="/"
              element={
                <Navigate replace to={{ pathname: "/calendar/" + month }} />
              }
            />
          </Routes>
        </Router>
      </authContext.Provider>
    );
  } else {
    return (
      <>
        <Container maxWidth="sm">
          <Typography variant="h3" component="div" margin={2}>
            Agenda React
          </Typography>

          <Typography variant="body1" margin={2}>
            {formScreen
              ? `Digite e-mail e senha para entrar no sistema.`
              : `Digite nome,e-mail e senha para entrar no sistema.`}{" "}
            <br />
            {formScreen ? `Caso não tenha usuário` : `Caso tenha usuário`}
            <Button
              variant="text"
              onClick={() => {
                formScreen ? SetFormScreen(false) : SetFormScreen(true);
              }}
            >
              Clique aqui
            </Button>
          </Typography>
          {formScreen ? (
            <LoginScreen onSignIn={setUser} />
          ) : (
            <CreateScreen onCreateIn={onSignOut} />
          )}
        </Container>
      </>
    );
  }
}

export default App;
