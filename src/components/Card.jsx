import React from 'react';
import '../sass/Card.scss';

const Card = ({ icon, name, imageUrl }) => {
  return (
    <div className="card">
      <p className="card__name">{name || "Desconocido"}</p>
      <div className="card__circle"></div>
      <img className="card__img" src={imageUrl} alt={`Imagen de ${name}`} />
      {icon}
    </div>
  );
};

export { Card };
