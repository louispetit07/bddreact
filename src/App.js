import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import HelloWorld from './test'
import MyComponent from './affichesql'
import MyComponentEcole from './ecole'
import MyComponentGen from './affichegen'
import Graph from './graph'


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/test" element={<HelloWorld />} />
        <Route path="/pro" element={<MyComponent />} />
        <Route path="/ecole" element={<MyComponentEcole />} />
        <Route path="/gen" element={<MyComponentGen />} />
        <Route path="/quoicoubeh" element={<Graph />} />
      </Routes>
    </Router>
  );
}

export default App;