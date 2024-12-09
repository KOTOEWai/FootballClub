

import React from 'react';
import 'flowbite/dist/flowbite.min.css';
import './App.css';

import {  AuthProvider } from "./components/AuthContext.jsx"

// Define your routes for RouterProvider
import Routes from './routes/index.jsx'

function App() {
 
  return (
    <React.StrictMode>
    <AuthProvider>
        <Routes/>
    </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
