import { useEffect, useState } from "react";
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
import React from "react";

function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null | void>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
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
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
