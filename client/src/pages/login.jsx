import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
