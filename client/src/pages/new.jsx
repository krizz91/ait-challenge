import React from 'react';
import { useSelector } from 'react-redux';

export const NewPage = () => {
  const token = useSelector(state => state.session.token);

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let code = formData.get("code");
    let description = formData.get("description");
    let price = formData.get("price");

    fetch('http://127.0.0.1:8000/challenge/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      body: JSON.stringify({
        'code': code,
        'description': description,
        'price': price
      }),
    })
    .then(response => {
      if(response.status == 201){
        return response.json();
      }else{
        alert('Error')
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <h2>Nuevo Elemento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Code: <input name="code" type="text" />
        </label>
        <br />
        <label>
          Description: <input name="description" type="text" />
        </label>
        <br />
        <label>
          Price: <input name="price" type="number" />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
