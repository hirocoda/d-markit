import { Container } from '@chakra-ui/react';
import React from 'react';

function WrapContent({ children }) {
  return (
    <Container maxW="container.xl" px={[5, 8]} mx="auto">
      {children}
    </Container>
  );
}

export default WrapContent;
