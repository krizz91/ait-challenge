import React from 'react';
import { useParams } from 'react-router-dom';

export const EditPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Editar Elemento</h2>
      <p>ID del Elemento: {id}</p>
    </div>
  );
};
