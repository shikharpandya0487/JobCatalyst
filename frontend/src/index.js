import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from 'react-toastify'




ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </AuthProvider>
  );

