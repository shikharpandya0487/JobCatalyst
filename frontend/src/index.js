import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from "react-hot-toast";
import {ThemeProvider} from './Context/ThemeContext';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'


if(process.env.NODE_ENV==='production') disableReactDevTools()



const store = configureStore({
  reducer:rootReducer,
});


ReactDOM.createRoot(document.getElementById('root')).render(
     <ChakraProvider>
      <ThemeProvider>
        <Provider store = {store}>
          <App />
          <Toaster/>
        </Provider>
        </ThemeProvider>
      </ChakraProvider>
  ); 

