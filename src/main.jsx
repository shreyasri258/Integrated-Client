import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import store from './store/store';
import {Provider} from "react-redux";
import { AuthProvider } from './store/UserAuth';
import {AdminContextProvider } from "./contextCalls/adminContext/AdminContext";
import { StudentContextProvider } from "./contextCalls/studentContext/StudentContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
     <StudentContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </StudentContextProvider>
      </AuthProvider>
      </Provider>
  </React.StrictMode>
);

