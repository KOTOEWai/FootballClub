import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Login from '../components/login';
import SignUp from '../components/signUp';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Tickets from '../components/Tickets';
import AdminPanel from '../Admin/sidebar';
import Dashboard from '../Admin/dashboard';
import AdminMatch from '../Admin/match';
import AdminPlayer from '../Admin/player';
import { AuthContext } from '../components/AuthContext';
import User from '../Admin/users';
import Ticketdetails from '../components/ticketDetail'
import AdminTickets from '../Admin/tickets'
import { ProtectAdmin } from '../components/adminAuth';
import { MatchProvider } from '../components/MatchContext';
import Checkout from '../components/Cart'
import Player from '../components/Player'
import Product from '../Admin/product'
import PlayerDetail from '../components/PlayerDetail'
import Store from '../components/Store'
function Index() {
  const { user } = useContext(AuthContext);
  const routes = [
    {
      path: "/",
      element: (
        <MatchProvider>
          <Navbar />
          <Outlet /> {/* Required for rendering child routes */}
          <Footer />
        </MatchProvider>
      ),
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={'/signup'} />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: !user ? <SignUp /> : <Navigate to={'/'} />,
        },
        {
          path: "/ticket",
          element: user ? <Tickets /> : <Navigate to={'/signup'} />,
        },
        {
          path: "/ticketDetails/:id",
          element: user ? <Ticketdetails /> : <Navigate to={'/signup'} />,
        },
        {
          path: "/checkoutDetails/:id",
          element: <Checkout />,
        },
        {
          path: "/player",
          element: <Player/>,
        },
        {
          path: "/playerDetails/:id",
          element: <PlayerDetail/>,
        },
        {
          path: "/Store",
          element: <Store/>,
        }
      ],
    },
    {
      path: "/admin",
      element: <ProtectAdmin><AdminPanel /></ProtectAdmin>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "matches",
          element: <AdminMatch />,
        },
        {
          path: "matches/:id",
          element: <AdminMatch />,
        },
        {
          path: "players",
          element: <AdminPlayer />,
        },
        {
          path: "players/:id",
          element: <AdminPlayer />,
        },
        {
          path: "users",
          element: <User />,
        },
        {
          path: "tickets/:id",
          element: <AdminTickets />,
        },
        {
          path: "product",
          element: <Product />,
        }
      ],
    },
  
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_startTransition: true,
    },
  });

  return <RouterProvider router={router} />;
}

export default Index;