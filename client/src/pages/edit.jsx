import React from 'react';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Editar Elemento</h2>
      <p>ID del Elemento: {id}</p>
    </div>
  );
};

export default Edit;
