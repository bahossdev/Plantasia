// import OrderHistory from "../pages/OrderHistory";
// <OrderHistory />

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QUERY_ME, QUERY_PLANTS, QUERY_BLOGS, QUERY_PRODUCTS, QUERY_USER } from '../utils/queries';
import { REMOVE_PLANT } from '../utils/mutations';
import Auth from '../utils/auth';


function Profile() {
  const { username: userParam } = useParams();
  console.log(userParam);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  // const { loading: loadingPlants, data: plantsData } = useQuery(QUERY_PLANTS);
  // const { loading: loadingBlogs, data: blogsData } = useQuery(QUERY_BLOGS);
  // const { loading: loadingProducts, data: productsData } = useQuery(QUERY_PRODUCTS);
  const [removePlant, { error }] = useMutation(REMOVE_PLANT);

  console.log('data: ', data);
  const userData = data?.me || data?.user || {};
  console.log(userData);
  console.log(Auth.getProfile())

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
      // const { data } = await refetch();
      // userData = data.me;
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // const user = userData?.user || {};
  // const userFavoritePlants = user.favoritePlants || [];
  // const userBlogs = user.blogs || [];
  // const userOrderHistory = user.orders || [];

  return (
    <div>
      {/* <h2>Welcome, {userData.username}!</h2> */}
      <h2>Welcome, {userData?.username}!</h2>
      <div className='fav-plants'>
        <h3>Favorite Plants</h3>
        <ul>
          {userData?.plants?.map((plant) => (
            <li key={plant._id}>{plant.plantName}
              {!userParam ? <button data-id={plant._id} onClick={(e) => handleRemovePlant(e.target.dataset.id)}>Delete</button> : ''}
            </li>
          ))}
        </ul>
      </div>

      {/* <div>
        <h3>Order History</h3>
        <ul>
          {userData.orderHistory.map((order) => (
            <li key={order._id}></li>
          ))}
        </ul>
      </div> */}

      <div >
        <h3>My Blogs</h3>
        <ul>
          {userData?.blogs?.map((blog) => (
            <li key={blog._id}>{blog.blogText}
              {/* {!userParam ? <button data-id={blog._id}onClick={(e) => handleRemovePlant(e.target.dataset.id)}>Delete</button> : ''} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;

