import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ImportPage = () => {
  let navigate = useNavigate();

  const token = useSelector(state => state.session.token);

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    fetch('http://127.0.0.1:8000/challenge/import/', {
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + token
      },
      body: formData,
    })
    .then(response => {
      navigate('/list', { replace: true })
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <h2>Importar Elementos</h2>
      <p>Se requiere que el archivo a importar sea un XLS</p>
      <p>El formato esperado es el siguiente:</p>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Descripcion</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cod de art</td>
            <td>Desc de art</td>
            <td>Precio de art</td>
          </tr>
        </tbody>
      </table>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          <input name="file" type="file" />
        </label>{" "}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
