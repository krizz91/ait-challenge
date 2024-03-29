import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ListPage = () => {
  let navigate = useNavigate();
  const token = useSelector(state => state.session.token);

  const [ list, setList ] = useState([ ])

  fetch('http://127.0.0.1:8000/challenge/list/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    },
  })
  .then(response => {
    return response.json();
  })
  .then(response => {
    setList(response.data);
  })

  const export_article = () => {
    fetch('http://127.0.0.1:8000/challenge/export/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
    })
    .then(response => {
      return response.blob();
    })
    .then(response => {
      const blobUrl = URL.createObjectURL(response);
      window.open(blobUrl);
    })
  }

  return (
    <div>
      <h2>Listado de Elementos</h2>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(art => (
            <tr>
              <td>{art.code}</td>
              <td>{art.description}</td>
              <td>{art.price}</td>
              <td>
                <button onClick={() => navigate(`/edit/${art.id}`, {
                  replace: true,
                  state: {
                    object: art
                  }
                })}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => navigate('/new/', { replace: true })}>Nuevo</button>
        <button onClick={() => navigate('/import/', { replace: true })}>Importar</button>
        <button onClick={() => export_article()}>Exportar</button>
      </div>
    </div>
  );
};
