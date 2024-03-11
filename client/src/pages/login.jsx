import { useNavigate } from "react-router-dom";

export function LoginPage({ useAuth, redirectTo }) {
  let navigate = useNavigate();
  let auth = useAuth();

  let to = redirectTo || "/list";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");
    let password = formData.get("password");

    auth.signin({username, password}, () => {
      navigate(to, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {redirectTo}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <label>
          Password: <input name="password" type="password" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}