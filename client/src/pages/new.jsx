import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const NewPage = () => {
  let navigate = useNavigate();

  const token = useSelector(state => state.session.token);

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

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
      if(response.status === 201){
        navigate('/list', { replace: true })
      }else{
        alert('Error');
        throw 'Error'
      }
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
          Code: <input name="code" type="text" onChange={(e) => setCode(e.target.value)} />
        </label>
        <br />
        <label>
          Description: <input name="description" type="text" onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Price: <input name="price" type="number" step="0.01" onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
