import OrderHistory from "../pages/OrderHistory";
import garbagecanGif from '../assets/garbagecan.gif';
import noteDeleteGif from '../assets/notesgarbage.gif';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { REMOVE_PLANT } from '../utils/mutations';
import { DELETE_BLOG } from '../utils/mutations';
import Auth from '../utils/auth';


function Profile() {
  const { username: userParam } = useParams();
  console.log(userParam);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [removePlant, { plantError }] = useMutation(REMOVE_PLANT);
  const [deleteBlog, { blogError }] = useMutation(DELETE_BLOG);

  console.log('data: ', data);
  const userData = data?.me || data?.user || {};
  // console.log(userData);
  // console.log(Auth.getProfile())

  if (
    Auth.loggedIn() && Auth.getProfile().data.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  const handleRemovePlant = async (plantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await removePlant({
        variables: { plantId: plantId }
      })
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await deleteBlog({
        variables: { blogId: blogId }
      })
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (plantError) return <div>Error: {plantError.message}</div>;
  if (blogError) return <div>Error: {blogError.message}</div>;

  return (
    <div className="profile-container">
      <h2>Welcome, {userData?.username}!</h2>
      <div>
        <h3>Favorite Plants</h3>
        <div className="flex-row-profile">
          {userData?.plants?.map((plant) => (
            <div className="transparent justify-center" key={plant._id}><img src={`/images/${plant.image}`} /> <text className="plant-name">{plant.plantName}</text>
              <div>{!userParam ?
                <img className='gif' src={garbagecanGif} data-id={plant._id} onClick={(e) => handleRemovePlant(e.target.dataset.id)} /> : ''}
              </div>
            </div>
          ))}
        </div>
        <Link to="/plantcare">See all Plants</Link>
      </div>

      <div >
        <h3>My Blogs</h3>
        <div className="flex-row-profile">
          {userData?.blogs?.map((blog) => (
            <div className="card-icon" key={blog._id}><h4>{blog.blogText}</h4>
              {!userParam ?
                <img className='gif' src={noteDeleteGif} data-id={blog._id} onClick={(e) => handleDeleteBlog(e.target.dataset.id)} /> : ''}
            </div>
          ))}
        </div>
        <Link to="/forum">See all Blogs</Link>
      </div>

      <div>
        <h3>Order History</h3>
        <OrderHistory />
      </div>
    </div>
  );
}

export default Profile;

