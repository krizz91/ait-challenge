import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage({ useAuth, redirectTo }) {
  let navigate = useNavigate();
  let auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let to = redirectTo || "/list";

  function handleSubmit(event) {
    event.preventDefault();

    auth.signin({username, password}, () => {
      navigate(to, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {redirectTo}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>{" "}
        <label>
          Password: <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}