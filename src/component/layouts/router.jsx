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
import AddNewFlavor from "../userDashboard/addNewFlavor/AddNewFlavor.jsx";
import AddNewTopping from "../userDashboard/addNewTopping/AddNewTopping.jsx";
import AdminProtectedRoute from "../protectedRoute/AdminProtectedRoute.jsx";
import SeparateProtectedRoute from "../protectedRoute/SeparateProtectedRoute.jsx";
import AdminManageToppings from "../adminDashboard/status/Topping.jsx";
import AdminManageFlavors from "../adminDashboard/status/Flavor.jsx";
import AdminManageShapes from "../adminDashboard/status/Shape.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <SeparateProtectedRoute><Home /></SeparateProtectedRoute>,//non logged in user and user can access this page not admin
      },
      {
        path: "register",
        element: <Register />,//non logged in user can access this page
      },
      {
        path: "login",
        element: <Login />,//non logged in user can access this page
      },
      {
        path: "send-code",
        element: <SendCode />,//non logged in user can access this page
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,//non logged in user can access this page
      },
      {
        path: "profile",
        element: <ProtectedRoute> <Profile /></ProtectedRoute>,//user and admin can access this page
      },
      {
        path: "edituserinformation",
        element: <ProtectedRoute><EditUserInformation /></ProtectedRoute>,//user and admin can access this page
      },
      {
        path: "changepassword",
        element: <ProtectedRoute><ChangePassword /></ProtectedRoute>,//user and admin can access this page
      },

      {
        path: "seeall",
        element: <SeparateProtectedRoute><SeeAll /></SeparateProtectedRoute>,////non logged in user and user can access this page not admin
      },
      {
        path: "custom-cake",
        element: <SeparateProtectedRoute><CustomCake /></SeparateProtectedRoute>,////non logged in user and user can access this page not admin
      },
      {
        path: "cakeinformation",
        children: [
          {
            index: true,
            element: <CakeInformation />, // When no ID, used for preview after creation
          },
          {
            path: ":id", // When editing an existing cake
            element: <CakeInformation />,
          },
        ],
      },

      {
        path: "favourite",
        element: <SeparateProtectedRoute><Favourite /></SeparateProtectedRoute>//
      },
      // {
      //   path: "categories",
      //   element: <Categories />,
      // }

      {
        path: "cart",
        element: <SeparateProtectedRoute><Cart /></SeparateProtectedRoute>,
      },


      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",//all this pagees are protected by adminProtectedRoute
    //that means only admin can access this pages
    //if user is not admin then he will display page not found
    //if user is not logged in then he will redirect to login page
    element: <AdminProtectedRoute> <DashboardLayout /></AdminProtectedRoute>,
    errorElement: <NotFound />,
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
        path: "addnewtopping",
        element: <AddNewTopping />,
      },
      {
        path: 'addnewshape',
        element: <AddNewShape />,
      },
      {
        path: "addnewflavor",
        element: <AddNewFlavor />,
      },
      {
        path: "addnewcake",
        element: <AddNewCake />,
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
        path: "adminmanagetoppings",
        element: <AdminManageToppings />,
      },
      {
        path: "adminmanageflavors",
        element: <AdminManageFlavors />,
      },
      {
        path: "adminmanageshapes",
        element: <AdminManageShapes />,
      },
    ],
  },
]);
