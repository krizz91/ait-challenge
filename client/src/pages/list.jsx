import React from 'react';

const List = () => {

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
            <button onClick={() => window.location.href = `/edit/${elemento.id}`}>Editar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/new'}>Nuevo</button>
      <button onClick={() => window.location.href = '/import'}>Importar</button>
      <button onClick={() => window.location.href = '/export'}>Exportar</button>
    </div>
  );
};

export default List;
