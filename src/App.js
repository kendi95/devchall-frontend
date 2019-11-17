import React from 'react';
import './App.css';

import Router from './routes';
import "./pages/index.css";

function App() {
  return (
    <div className="container">

      <div className="content">
        <Router/> 
      </div>
      
    </div>
  );
}

export default App;
