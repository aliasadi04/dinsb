import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from './components/navbar.component';
import Home from './routes/homePage';
import FAQPage from './routes/faqPage';
import { ThemeProvider } from '@emotion/react';
import { PaletteMode, createTheme, responsiveFontSizes, useMediaQuery } from '@mui/material';
import LejPage from './routes/lejPage';

// white
//#FFF8F0
// black
//131200

//secondary
// 414770



let theme = createTheme({
  palette: {
    common: {
      black: '#131200'
    },
    primary: {
      main: '#EE7203'
    },
    text: {
      primary: '#140a00',

    }
  },
  typography: {
    fontFamily: 'Source Sans Pro'
  }

});

theme = responsiveFontSizes(theme);

function App() {



  


  return (
    <ThemeProvider theme={theme} >
      <Routes>
        <Route path="/" element={<Navbar />} >


          <Route index element={<Home />} />





          <Route path="/lej" element={<LejPage/>} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

      </Routes>
    </ThemeProvider>
  );
}

export default App;
