import { Box } from '@chakra-ui/react';
import React from 'react';
import CategoryGrid from '../components/marketplace/CategoryGrid';
import Header from '../components/marketplace/Header';

function MarketPlace() {
  return (
    <Box>
      <Header />
      <CategoryGrid />
    </Box>
  );
}

export default MarketPlace;
