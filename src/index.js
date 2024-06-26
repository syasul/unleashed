import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateComponent from './components/ProtectedRoute';
import Profile from './containers/Profile';
import Home from './containers/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={
            <PrivateComponent>
              <Home />
            </PrivateComponent>
          } />
          <Route path='profile' element={
            <PrivateComponent>
              <Profile />
            </PrivateComponent>
          } />
        </Route>
        <Route path="signin" element={
          <PrivateComponent loginOnly={false}>
            <SignIn />
          </PrivateComponent>
        } />
        <Route path="signup" element={
          <PrivateComponent loginOnly={false}>
            <SignUp />
          </PrivateComponent>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
