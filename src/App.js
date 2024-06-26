import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/Navbar';
import Home from './containers/Home';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const defaultTheme = createTheme()

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
    <div className="App">
      <ResponsiveAppBar />
      <Outlet />
    </div>
    </ThemeProvider>
  );
}

export default App;
