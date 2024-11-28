import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Login from '../components/login';
import SignUp from '../components/signUp';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Tickets from '../components/Tickets';
import AdminPanel from '../Admin/sidebar';
import Dashboard from '../Admin/dashboard';
import Match from '../Admin/match';
import Test from '../Admin/test';
import Player from '../Admin/player';
import { AuthContext } from '../components/AuthContext';
import User from '../Admin/users';


function Index() {
  const { user } = useContext(AuthContext);
  const routes = [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet /> {/* Required for rendering child routes */}
          <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={'/signup'} />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to={'/'} />,
        },
        {
          path: "/signup",
          element: !user ? <SignUp /> : <Navigate to={'/'} />,
        },
        {
          path: "/ticket",
          element: user ? <Tickets /> : <Navigate to={'/signup'} />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminPanel />, 
      children: [
        {
          path: "dashboard",
          element: <Dashboard />  // Protect this route
        },
        {
          path: "matches",
          element:<Match />, // Protect this route
        },
        {
          path: "matches/:id",
          element:<Match />, // Protect this route
        },
        {
          path: "test",
          element: <Test />, // Protect this route
        },
        {
          path: "players",
          element:<Player />, // Protect this route
        },
        {
          path: "players/:id",
          element: <Player />, // Protect this route
        },
        {
          path: "users",
          element: <User  />, // Protect this route
        }
      ],
    },
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_startTransition: true,
    },
  });

  return (
    <RouterProvider router={router} />
  );
}

export default Index;