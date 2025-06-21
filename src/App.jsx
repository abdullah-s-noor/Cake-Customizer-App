import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./component/layouts/router.jsx";
import { ToastContainer } from "react-toastify";
// index.js or App.jsx
import theme from './theme';

document.documentElement.style.setProperty(
  '--primary',
  theme.palette.primary.main
);
document.documentElement.style.setProperty(
  '--secondary',
  theme.palette.secondary.main
);
document.documentElement.style.setProperty(
  '--background',
  theme.palette.background.default
);


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
