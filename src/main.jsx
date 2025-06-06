import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme.js'
import UserContextProvider from "./component/context/User.jsx";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

    <>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </UserContextProvider>
    </>
)
