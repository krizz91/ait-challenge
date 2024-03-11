import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ListPage = () => {
  let navigate = useNavigate();

  const elementos = [
    { id: 1, nombre: 'Elemento 1' },
    { id: 2, nombre: 'Elemento 2' },
    { id: 3, nombre: 'Elemento 3' }
  ];

  return (
    <div>
      <h2>Listado de Elementos</h2>
      <ul>
        {elementos.map(elemento => (
          <li key={elemento.id}>
            {elemento.nombre}
            <button onClick={() => navigate(`/edit/${elemento.id}`, { replace: true })}>Editar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/new/', { replace: true })}>Nuevo</button>
      <button onClick={() => navigate('/import/', { replace: true })}>Importar</button>
      <button onClick={() => navigate('/export/', { replace: true })}>Exportar</button>
    </div>
  );
};
