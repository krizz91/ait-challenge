import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const EditPage = () => {
  const location = useLocation();
  let navigate = useNavigate();

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
      if(response.status === 200){
        navigate('/list', { replace: true })
      }else{
        alert('Error')
        throw 'Error'
      }
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
          Price: <input name="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
