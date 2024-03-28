import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer:rootReducer,
});


ReactDOM.createRoot(document.getElementById('root')).render(
     <ChakraProvider>
        <Provider store = {store}>
          <App />
          <Toaster/>
        </Provider>
      </ChakraProvider>
  ); 

