import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ReactQueryProvider } from './context/reactQuery';
import UserProvider from './context/userInfo';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <UserProvider>
        <Router>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </UserProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
