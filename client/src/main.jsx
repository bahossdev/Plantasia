import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import PlantList from './pages/PlantList';
import SinglePlant from './components/SinglePlant';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <HomePage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/success',
        element: <Success />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/plantcare',
        element: <PlantList />
      },
      {
        path: '/allplants/:id',
        element: <SinglePlant />
      },
      {
        path: '/orderHistory',
        element: <OrderHistory />
      },
      {
        path: '/products/:id',
        element: <Detail />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
