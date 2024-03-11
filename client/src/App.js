import * as React from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import { LoginPage } from './pages/login/login';
import { ListPage } from './pages/list';
import { EditPage } from './pages/edit';
import { NewPage } from './pages/new';
import { ImportPage } from './pages/import';
import { AuthContext, AuthProvider } from "./providers/auth";
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginPage useAuth={useAuth} />} />
          <Route path="/list" element={
            <RequireAuth>
              <ListPage />
            </RequireAuth>
          } />
          <Route path="/edit/:id" element={
            <RequireAuth>
              <EditPage />
            </RequireAuth>
          } />
          <Route path="/new" element={
            <RequireAuth>
              <NewPage />
            </RequireAuth>
          } />
          <Route path="/import" element={
            <RequireAuth>
              <ImportPage />
            </RequireAuth>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <Outlet />
    </div>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  const user = useSelector(state => state.session.user);
  let navigate = useNavigate();

  if (!user) {
    return;
  }

  return (
    <div class="action-bar">
      Welcome!{" "}
      <button
        class="action-btn"
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </div>
  );
}

function RequireAuth({ children }) {
  let location = useLocation();
  const user = useSelector(state => state.session.user);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
