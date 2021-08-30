import React, { useEffect, useState } from "react";
import { useAuth } from "./util/use-auth";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Listings from "./components/Listings";

function App() {
  // const [user, setUser] = useState(null);
  let location = useLocation();

  const history = useHistory();
  const auth = useAuth();
  useEffect(() => {
    // auto-login
    // fetch("/me").then((r) => {
    //   if (r.ok) {
    //     r.json().then((user) => setUser(user));
    //   }
    // });
    auth.autoSignIn();
  }, [auth]);

  console.log(auth.user);
  // let background = location.state && location.state.background;

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <PrivateRoute path="/listings">
          <Listings />
        </PrivateRoute>
      </Switch>
      {/* {background && <Route path="/login" children={<Login />} />} */}
    </div>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
