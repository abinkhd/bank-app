import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home";
import PrivateRoutes from "./PrivateRoutes";
import UserHome from "../component/UserHome";
import Login from "../component/Login";
import FundTransfer from "../component/FundTransfer";
import Transactions from "../component/Transactions";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    element: <PrivateRoutes />,
    children: [
      { path: "/userHome", element: <UserHome /> },
      { path: "/fundTransfer", element: <FundTransfer /> },
      { path: "/transaction", element: <Transactions /> },
    ],
  },
]);

export default routes;
