import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Registrasi from "../pages/Auth/Registrasi";
import UserLayout from "../layouts/UserLayout";
import Transaction from "../pages/Dashboard/Transaction";
import Profile from "../pages/Dashboard/Profile";
import NotFound from "../pages/Errors/NotFound";

const router = createBrowserRouter([
  {
    path : '/',
    element : <AuthLayout/>,
    
    children : [
      {
        index : true,
        element : <Login/>
      },
      {
        path : 'login',
        element : <Login/>
      },
      {
        path : 'registrasi',
        element : <Registrasi/>
      },
    ]
  },
  {
    element: <UserLayout/>,
    children: [
      {
        path: '/dashboard',
        element: <Transaction/>
      },
      {
        path: '/profile',
        element: <Profile/>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

export default router;