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
  const [search, setSearch] = useState(null);

  const auth = useAuth();
  useEffect(() => {
    // auto-login
    // fetch("/me").then((r) => {
    //   if (r.ok) {
    //     r.json().then((user) => setUser(user));
    //   }
    // });
    auth.autoSignIn();
  }, []);

  console.log(auth.user);
  console.log(search);
  // let background = location.state && location.state.background;

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Landing handleSearch={setSearch} />
        </Route>
        <PrivateRoute path="/listings">
          <Listings search={search} setSearch={setSearch} />
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
