import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <Heading as="h1" fontSize={['xl', '2xl']}>
        D-Markit.
      </Heading>
    </Link>
  );
}

export default Logo;
