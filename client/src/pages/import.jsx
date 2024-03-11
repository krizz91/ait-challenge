import React from 'react';
import { useSelector } from 'react-redux';

export const ImportPage = () => {

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
  }

  return (
    <div>
      <h2>Importar Elementos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input name="file" type="file" />
        </label>{" "}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
