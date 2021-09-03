// Hook (use-auth.js)
import React, { useState, useContext, createContext } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

// Tried this tutorial
// https://medium.com/swlh/react-reactions-cfdde7f08dff

const API_KEY = process.env.REACT_APP_API_ENDPOINT;

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const history = useHistory();

  function signin(username, password) {
    setIsLoading(true);
    // fetch(API_KEY + "/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password }),
    // })
    axios
      .post(
        API_KEY + "/login",
        { username: username, password: password },
        { withCredentials: true }
      )
      .then((r) => {
        setIsLoading(false);
        console.log(r);
        if (r.statusText === "Created") {
          setUser(r.data);
        } else {
          // r.json().then((err) => setErrors(err.errors));
          console.log(r);
        }
      });
  }
  function signup(signUpData) {
    setErrors([]);
    setIsLoading(true);
    // fetch(API_KEY + "/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(signUpData),
    // })
    axios
      .post(API_KEY + "/signup", { signUpData }, { withCredentials: true })
      .then((r) => {
        setIsLoading(false);
        if (r.statusText === "Created") {
          setUser(r.data);
        } else {
          // r.json().then((err) => setErrors(err.errors));
          console.log(r);
        }
      });
  }
  function signout() {
    // fetch(API_KEY + "/logout", { method: "DELETE" })
    axios.delete(API_KEY + "/logout").then(() => {
      setUser(null);
    });
  }
  function autoSignIn() {
    // fetch(API_KEY + "/me")
    axios.get(API_KEY + "/me").then((r) => {
      console.log(r);
      setUser(r.data);
    });
  }

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    autoSignIn,
    errors,
    isLoading,
  };
}
