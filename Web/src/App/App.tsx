import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { getUserEndpoint, IUser } from "./backend";
import CalendarScreen from "./CalendarScreen";
import { getToday } from "./dateFunctions";
import LoginScreen from "./LoginScreen";
import { authContext } from "./authContext";
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

// class App2 extends React.Component<{}, { user: IUser | null | void }> {
//   // state: {
//   //   user: IUser | null | void;
//   // } = {
//   //   user: null,
//   // };
//   setUser: (user: IUser) => void;
//   onSignOut: () => void;
//   constructor(props: {}) {
//     super(props);
//     this.state = { user: null };

//     this.onSignOut = () => {
//       this.setState({ user: null });
//     };
//     this.setUser = (user: IUser) => {
//       this.setState({ user });
//     };
//   }
//   render() {
//     const month = getToday().substring(0, 7);

//     const { user } = this.state;
//     if (user) {
//       return (
//         <authContext.Provider value={{ user, onSignOut: this.onSignOut }}>
//           <Router>
//             <Routes>
//               <Route path="/calendar/:month" element={<CalendarScreen />} />
//               <Route
//                 path="/"
//                 element={
//                   <Navigate replace to={{ pathname: "/calendar/" + month }} />
//                 }
//               />
//             </Routes>
//           </Router>
//         </authContext.Provider>
//       );
//     } else {
//       return <LoginScreen onSignIn={this.setUser} />;
//     }
//   }
//   componentDidMount() {
//     getUserEndpoint().then(this.setUser, this.onSignOut);
//   }
// }

export default App;
