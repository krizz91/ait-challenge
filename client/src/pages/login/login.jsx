import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

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
    <div class="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="username">Username</label>
          <input name="username" type="text" onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

