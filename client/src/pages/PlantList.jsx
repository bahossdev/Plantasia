import { useQuery } from '@apollo/client';
import { QUERY_PLANTS } from '../utils/queries';
import { Link } from 'react-router-dom';


const PlantList = () => {
  const { loading, data, error } = useQuery(QUERY_PLANTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="my-2">
        <h2>Plant Care Information 🌱</h2>
        <div className="flex-row ">
          {data.plants.map((plant, index) => (
            <div key={index} className='transparent' style={{ cursor: 'pointer' }}>
              <Link to={`/plantcare/${plant.plantName}`}>
                <img src={`/images/${plant.image}`} alt={plant.plantName} />
                <p>{plant.plantName}</p>
              </Link >
            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantList;
