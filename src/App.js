import React, { useEffect, useState } from "react";
import { useAuth } from "./util/use-auth";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import Login from "./components/auth/Login";
import Listings from "./components/Listings";
import AddBoat from "./components/boatForms/AddBoat";
import BoatDetails from "./components/boatDetails/BoatDetails";
import MyBoats from "./components/MyBoats";
import EditMyBoats from "./components/boatForms/EditMyBoats";
import MyBookings from "./components/MyBookings";

function App() {
  const [search, setSearch] = useState(null);
  const [boats, setBoats] = useState([]);
  const [myBoats, setMyBoats] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const API_KEY = process.env.REACT_APP_API_ENDPOINT;

  const auth = useAuth();
  useEffect(() => {
    auth.autoSignIn();

    fetch(API_KEY + "/bookings").then((r) => {
      if (r.ok) {
        r.json().then((data) => setMyBookings(data));
      }
    });
  }, []);

  console.log(myBookings);

  useEffect(() => {
    fetch(API_KEY + "/boats").then((r) => {
      if (r.ok) {
        r.json().then((data) => setBoats(data));
      }
    });
  }, [search]);

  useEffect(() => {
    if (auth.user) {
      setMyBoats(auth.user.boats);
    }
  }, [auth.user]);

  console.log(boats);

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
        <PrivateRoute path="/listings/:id">
          <BoatDetails myBookings={myBookings} setMyBookings={setMyBookings} />
        </PrivateRoute>
        <PrivateRoute path="/listings">
          <Listings
            search={search}
            setSearch={setSearch}
            boats={boats}
            setBoats={setBoats}
          />
        </PrivateRoute>
        <PrivateRoute path="/my-bookings">
          <MyBookings myBookings={myBookings} setMyBookings={setMyBookings} />
        </PrivateRoute>
        <PrivateRoute path="/add-a-boat">
          <AddBoat
            boats={boats}
            setBoats={setBoats}
            myBoats={myBoats}
            setMyBoats={setMyBoats}
          />
        </PrivateRoute>
        <PrivateRoute path="/my-boats/:id">
          <EditMyBoats
            myBoats={myBoats}
            setMyBoats={setMyBoats}
            boats={boats}
            setBoats={setBoats}
          />
        </PrivateRoute>
        <PrivateRoute path="/my-boats">
          <MyBoats myBoats={myBoats} setMyBoats={setMyBoats} />
        </PrivateRoute>
      </Switch>
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
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
