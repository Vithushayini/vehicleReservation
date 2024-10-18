import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from "@asgardeo/auth-react";
import './index.css'; 
import App from './App';

const authConfig = {

  clientID:"NVIfXFkgYD5yR4CQ6sWHYeoVkXka",
  baseUrl:"https://api.asgardeo.io/t/vithushayini",
  signInRedirectURL:"http://localhost:3000",
  signOutRedirectURL:"http://localhost:3000",
  scope: [ "openid", "profile","email","address","phone"]

};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>,
  </React.StrictMode>

);

