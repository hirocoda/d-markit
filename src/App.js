import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import Header from './components/layout/Header';
import './styles/global.css';
import Home from './pages/Home';

import { extendTheme } from '@chakra-ui/react';
import MarketPlace from './pages/MarketPlace';
import Footer from './components/layout/Footer';
import ProductPage from './components/Product/ProductPage';
import Item from './pages/Item';
import AuthProvider from './context/AuthContext';
import DataProvider from './context/DataContext';

const customTheme = extendTheme({
  colors: {
    brand: {
      100: '#333333',
      200: '#ed2224',
      300: '#ef682f',
      400: '#005e8a',
      500: '#063f59',
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <DataProvider>
          <Box bg="#f3f3f3" minH="100vh">
            <BrowserRouter>
              <ScrollToTop>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/marketplace" element={<MarketPlace />} />
                  <Route path="/item/:id" element={<Item />} />
                  <Route path="/category/:category" element={<ProductPage />} />
                </Routes>
                <Footer />
              </ScrollToTop>
            </BrowserRouter>
          </Box>
        </DataProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
