import { useState } from 'react'
import {
  RouterProvider
} from "react-router-dom";
import {router} from './component/layouts/router.jsx'

function App() {
  return (
    <>
    <RouterProvider router={router} />
    
    </>
  )
}

export default App
