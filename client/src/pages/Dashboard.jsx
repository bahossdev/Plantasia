import OrderHistory from "../pages/OrderHistory";
<OrderHistory />

import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';

function Dashboard() {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { userData } = data;

  return (
    <div>
      <h2>Welcome, {userData.firstName}!</h2>

      <div>
        <h3>Favorite Plants</h3>
        <ul>
          {userData.favoritePlants.map((plant) => (
            <li key={plant.id}>{plant.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Order History</h3>
        <ul>
          {userData.orderHistory.map((order) => (
            <li key={order.id}>{/* Render order details */}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>My Blogs</h3>
        <ul>
          {userData.blogs.map((blog) => (
            <li key={blog.id}>{/* Render blog details */}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

