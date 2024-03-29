import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QUERY_SINGLE_PLANT, QUERY_ME } from '../utils/queries';
import { ADD_PLANT } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

const SinglePlant = () => {
  let { plantName } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_PLANT, {
    variables: { plantName }
  });
  const [addPlant] = useMutation(ADD_PLANT);
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const userPlants = userData?.me?.plants || [];
  const plant = data?.plant || {};

  console.log(plant);
  if (userLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = async () => {
    try {
      await addPlant({
        variables: { plantId: plant._id }
      });
      window.location.reload();
      alert('Plant added to favourites!🪴');
    } catch (error) {
      console.error(error);
      alert('Failed to add plant to favorites.');
    }
  };
  return (
    <>
      <div className='plant-card'>
        <img src={`/images/${plant.image}`} alt={plant.plantName} />
        <div className="plant-details">
          <h2>{plant.plantName}</h2>
          {plant.description && <p><strong>Description: </strong>{plant.description}</p>}
          {plant.careLevel && <p><strong>Care Level: </strong>{plant.careLevel}</p>}
          {plant.waterLevel && <p><strong><img src='/waterdroplet.png' className='png'/>: </strong>{plant.waterLevel}</p>}
          {plant.lightLevel && <p><strong><img src='/sun.png' className='png'/>: </strong>{plant.lightLevel}</p>}
          {plant.size && <p><strong>Size: </strong>{plant.size}</p>}
          {plant.trait && <p><strong>Traits: </strong>{plant.trait}</p>}
        </div>
      </div>
        <img className='gif' onClick={() => handleClick()} src={userPlants?.some((userPlant) => userPlant._id === plant._id) ? '/addplantgrey.png' : '/addPlantActive.gif'}/> 

      <Link to={`/plantcare/`}>
      <img className='gif' src= {'/previouspage.gif'} /> Back to all Plants 
      </Link >
    </>

  );
};

export default SinglePlant;
