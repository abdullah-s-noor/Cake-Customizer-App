import React from 'react'
import {
    createBrowserRouter,
} from "react-router-dom";

import Layout from './UserLayout.jsx';
import DashboardLayout from './DashboardLayout.jsx';

import Home from '../userDashboard/home/Home.jsx';
import Categories from '../userDashboard/categories/Categories.jsx';

import HomeDashboard from '../adminDashboard/home/Home.jsx';
import CategoriesDashboard from '../adminDashboard/categories/Categories.jsx'
import CustomCake from '../userDashboard/customCake/CustomCake.jsx';

import Register from '../register/Register.jsx';
import Login from '../login/Login.jsx';
import Cart from '../userDashboard/cart/Cart.jsx'
import SendCode from '../sendCode/SendCode.jsx';
import ForgetPassword from '../forgetPassword/ForgetPassword.jsx';
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <h1>404 page not found ---web</h1>,
        children: [
            {
                path:'login',
                element : <Login />
            },
            {
                path:'register',
                element:<Register/>,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "custom-cake",
                element: <CustomCake />,
            },
            {
                path: "cart",
                element: <Cart/>,
            },
            {
                path: "send-code",
                element: <SendCode/>,
            },
            {
                path: "forget-password",
                element: <ForgetPassword/>,
            },
            {
                path: "*",
                element: <h1>404 page not found ---web</h1>,
            }
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <h1>404 page not found ---dashboard</h1>,
        children: [
            {
                path: "home",
                element: <HomeDashboard />,
            },
            {
                path: "categories",
                element: <CategoriesDashboard />
            },
            {
                path: "*",
                element: <h1>404 page not found ---dashboard</h1>,
            }
        ],
    }

]);
