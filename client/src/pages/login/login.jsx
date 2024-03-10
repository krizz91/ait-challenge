import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticación (p. ej., enviar credenciales al servidor)
    // Si la autenticación es exitosa, redirige a la lista de elementos
    // navigate('/list');
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
