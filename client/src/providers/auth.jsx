import * as React from "react";
import { useDispatch } from "react-redux";

import { update_user_info } from "../redux/modules/session-reducer";

let AuthContext = React.createContext();

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

function AuthProvider({ children }) {
  // let [user, setUser] = React.useState();
  const dispatch = useDispatch();
  // console.log('refresh', user, children);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      dispatch(update_user_info(true));
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      dispatch(update_user_info(false));
      callback();
    });
  };

  let value = { signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
