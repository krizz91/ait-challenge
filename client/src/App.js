import * as React from "react";

import './App.css';
import { authProvider } from "./providers/login";
import { Login } from './pages/login';

function App() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>
    </AuthProvider>
  );
}

let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = React.useState();

  let signin = (newUser, callback) => {
    return authProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser();
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default App;
