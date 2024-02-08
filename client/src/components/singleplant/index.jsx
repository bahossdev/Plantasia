import React from 'react';

const SinglePlant = ({ plant }) => {
  return (
    <div>
      <h2>{plant.plantName}</h2>
      <img src={`/images/${plant.image}`} alt={plant.plantName} />
      {/* Check if description and price properties exist before rendering */}
      {plant.description && <p>Description: {plant.description}</p>}
      {plant.price && <p>Price: ${plant.price}</p>}
    </div>
  );
};

export default SinglePlant;
