import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const EditPage = () => {
  const location = useLocation();
  const obj = location.state.object;
  const token = useSelector(state => state.session.token);
  const [code, setCode] = useState(obj.code);
  const [description, setDescription] = useState(obj.description);
  const [price, setPrice] = useState(obj.price);

  function handleSubmit(event) {
    event.preventDefault();

    let id = obj.id

    fetch('http://127.0.0.1:8000/challenge/update/' + id, {
      method: 'PUT',
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
      if(response.status == 200){
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
      <h2>Editar Elemento</h2>
      <p>ID del Elemento: {obj.id}</p>
      <form onSubmit={handleSubmit}>
      <input name="id" type="text" value={obj.id} hidden/>
        <label>
          Code: <input name="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <br />
        <label>
          Description: <input name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Price: <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
