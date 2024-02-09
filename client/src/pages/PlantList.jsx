import React, { useState } from 'react';
import SinglePlant from '../components/singleplant/index';
import { plantss } from '../../../server/config/plantsData';

const PlantList = () => {
    const [selectedPlant, setSelectedPlant] = useState(null);
  
    // Function to handle click event and set the selected plant
    const handleClick = (plant) => {
      setSelectedPlant(plant);
    };
  
    const handleBack = () => {
        setSelectedPlant(null); // Reset selectedPlant to null
      };

      return (
        <div>
          {selectedPlant ? (
            <div>
              <h1>Selected plant 🌱</h1>
              <SinglePlant plant={selectedPlant} />
              <button onClick={handleBack}>Back to all plants</button>
            </div>
          ) : (
            <div>
              <h1>Different plants 🌱</h1>
              <ul>
                {plantss.map((plant, index) => (
                  <li key={index} onClick={() => handleClick(plant)} style={{ cursor: 'pointer' }}>
                    <img src={`/images/${plant.image}`} alt={plant.plantName} />
                    <p>{plant.plantName}</p> {/* Render plant name */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
  };


export default PlantList;
