// import OrderHistory from "../pages/OrderHistory";
// <OrderHistory />

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_ME, QUERY_PLANTS, QUERY_BLOGS, QUERY_PRODUCTS } from '../utils/queries';
import { ADD_PLANT } from '../utils/mutations';
import { REMOVE_PLANT } from '../utils/mutations';
import Auth from '../utils/auth';


function Dashboard() {
  const [removePlant, { error }] = useMutation(REMOVE_PLANT);
  const { loading: loadingUserData, data: userData } = useQuery(QUERY_ME);
  // const { loading: loadingPlants, data: plantsData } = useQuery(QUERY_PLANTS);
  // const { loading: loadingBlogs, data: blogsData } = useQuery(QUERY_BLOGS);
  // const { loading: loadingProducts, data: productsData } = useQuery(QUERY_PRODUCTS);

  // userData = data?.me || {};
  // console.log(userData);

  // const handleRemovePlant = async (plantId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     await removePlant({
  //       variables: { plantId: plantId }
  //     })
  //     const { data } = await refetch();
  //     userData = data.me;
      
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (loadingUserData) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // const user = userData?.user || {};
  // const userFavoritePlants = user.favoritePlants || [];
  // const userBlogs = user.blogs || [];
  // const userOrderHistory = user.orders || [];

  return (
    <div>
      {/* <h2>Welcome, {userData.username}!</h2> */}
      <h2>Welcome, {userData && userData.me && userData.me.username ? userData.me.username : 'Guest'}!</h2>
      {/* <div>
        <h3>Favorite Plants</h3>
        <ul>
          {userData.favoritePlants.map((plant) => (
            <li key={plant._id}>{plant.name}</li>
          ))}
        </ul>
      </div> */}

      {/* <div>
        <h3>Order History</h3>
        <ul>
          {userData.orderHistory.map((order) => (
            <li key={order._id}></li>
          ))}
        </ul>
      </div>

      <div>
        <h3>My Blogs</h3>
        <ul>
          {userData.blogs.map((blog) => (
            <li key={blog._id}></li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default Dashboard;

