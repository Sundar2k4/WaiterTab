import React from 'react';
import Requirement from './components/Requirement';
import Dash from './components/Dash';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Bill from './components/Bill';

const App = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Requirement />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/bill" element={<Bill/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
