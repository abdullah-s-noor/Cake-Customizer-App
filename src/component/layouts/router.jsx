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
import AddNewShape from "../userDashboard/addNewShape/AddNewShape.jsx";
import SeeAll from "../userDashboard/home/SeeAll.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path:'addnewshape',
        element: <AddNewShape />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "seeall",
        element: <SeeAll />,
      },
      {
        path: "login",
        element:<Login /> ,
      },
      {
        path: "send-code",
        element: <SendCode />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "profile",
        element: <Profile /> ,
      },
      {
        path: "edituserinformation",
        element: <EditUserInformation />,
      },
      {
        path: "changepassword",
        element: <ChangePassword />,
      },
      
      {
        path: "custom-cake",
        element:   <CustomCake />,
      },
      {
        path: "cakeinformation",
        element: <CakeInformation />,
      },
      
      {
        path: "favourite",
        element: <Favourite />
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
        path: "cart",
        element: <Cart />,
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
        path: "adminmanageusers",
        element: <AdminManageUsers />,
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
