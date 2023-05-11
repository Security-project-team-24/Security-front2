import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route,
  } from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { routes } from './routing/routes';
import ProtectedRoute from './routing/ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = extendTheme({
    colors: {
      brand: {
        100: "#f7fafc",
        // ...
        900: "#1a202c",
      },
    },
  })

const router = createBrowserRouter(routes)


root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App></App>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
