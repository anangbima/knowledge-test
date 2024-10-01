import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Registrasi from "../pages/Auth/Registrasi";

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
  }
])

export default router;