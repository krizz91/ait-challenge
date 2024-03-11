import * as React from "react";
import { useDispatch } from "react-redux";

import { set_token, update_user_info } from "../redux/modules/session-reducer";

let AuthContext = React.createContext();

/**
 * This represents some generic auth provider API, like Firebase.
 */
const backendAuthProvider = {
  isAuthenticated: false,
  signin({username, password}, callback) {
    let status;
    fetch('http://127.0.0.1:8000/challenge/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      }),
    })
    .then(response => {
      status = response.status;
      if(status === 200){
        return response.json();
      }else{
        alert('Credenciales Incorrectas');
        throw 'Credenciales Incorrectas';
      }
    })
    .then(response => {
      backendAuthProvider.isAuthenticated = true;
      callback(response)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  signout(callback) {
    backendAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  let signin = (newUser, callback) => {
    return backendAuthProvider.signin(newUser, (response) => {
      dispatch(update_user_info(true));
      dispatch(set_token(response.token));
      callback();
    });
  };

  let signout = (callback) => {
    return backendAuthProvider.signout(() => {
      dispatch(update_user_info(false));
      dispatch(set_token(null));
      callback();
    });
  };

  let value = { signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
