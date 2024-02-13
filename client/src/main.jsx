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
import Profile from './pages/Profile';
import Success from './pages/Success';
import PlantList from './pages/PlantList';
import Guide from './pages/Guide';
import Hello from './components/Hello/index';
import BlogList from './components/BlogList/index.jsx';
import Good from './pages/Good'; 



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
        path: '/me',
        element: <Profile />
      },
      {
        path: '/profiles/:username',
        element: <Profile />
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
        path: '/plantcare/:plantName',
        element: <Hello />
      },
      {
        path: '/products/:id',
        element: <Detail />
      },
      {
        path: '/guide',
        element: <Guide />
      },
      {
        path: '/forum',
        element: <BlogList />
      },
      {
        path: '/blogs/:blogId',
        element: <Good />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
