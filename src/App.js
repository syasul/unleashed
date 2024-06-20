import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MasterBarangPage from './pages/MasterBarangPage';
import TransactionPage from './pages/TransactionPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/master-barang" element={<MasterBarangPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
