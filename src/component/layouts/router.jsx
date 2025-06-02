import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "./UserLayout.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Home from "../userDashboard/home/Home.jsx";
import Categories from "../userDashboard/categories/Categories.jsx";
import HomeDashboard from "../adminDashboard/home/Home.jsx";
import CategoriesDashboard from "../adminDashboard/categories/Categories.jsx";
import CustomCake from "../userDashboard/customCake/CustomCake.jsx";
import Register from "../register/Register.jsx";
import Login from "../login/Login.jsx";
import Cart from "../userDashboard/cart/Cart.jsx";
import SendCode from "../sendCode/SendCode.jsx";
import ForgetPassword from "../forgetPassword/ForgetPassword.jsx";
import EditUserInformation from "../EditUserInformation/EditUserInformation.jsx";
import AdminManageUsers from "../adminDashboard/Admin_Manage/AdminManageUsers.jsx";
import AdminManageOrders from "../adminDashboard/Admin_Manage/AdminManageOrders.jsx";
import AddNewCake from "../adminDashboard/addNewCake/AddNewCake.jsx";
import ChangePassword from "../changePassword/changePassword.jsx";
import CakeInformation from "../userDashboard/cakeInformation/CakeInformation.jsx";
import AdminManageCollections from "../adminDashboard/Admin_Manage/AdminManageCollections.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Profile from "../Profile/Profile.jsx";
import Favourite from "../Favourite/Favourite.jsx"
import ProtectedRoute from "../protectedRoute/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element:<Login /> ,
      },
      {
        path: "adminmanageusers",
        element: <AdminManageUsers />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "favourite",
        element: <Favourite />
      },

      {
        path: "adminmanageorders",
        element: <AdminManageOrders />,
      },
      { 
        path: "adminmanagecollections",
        element: <AdminManageCollections />,
      },
      {
        path: "cakeinformation",
        element: <CakeInformation />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "addnewcake",
        element: <AddNewCake />,
      },
      {
        path: "custom-cake",
        element: <ProtectedRoute>  <CustomCake /></ProtectedRoute>,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "changepassword",
        element: <ChangePassword />,
      },
      {
        path: "send-code",
        element: <SendCode />,
      },
      {
        path: "edituserinformation",
        element: <EditUserInformation />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement:<NotFound />,
    children: [
      {
        path: "home",
        element: <HomeDashboard />,
      },
      {
        path: "categories",
        element: <CategoriesDashboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
