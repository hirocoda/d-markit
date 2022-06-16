import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';
import Logo from '../../Logo';
import WrapContent from './WrapContent';

function Footer() {
  return (
    <Flex
      bg="#3e3e3e"
      color="white"
      alignItems="center"
      justifyContent="center"
      py="10"
      mt="10"
    >
      <WrapContent>
        <Flex
          w="full"
          as="footer"
          flexDir={{
            base: 'column',
            sm: 'row',
          }}
          align="center"
          justify="space-between"
          px="6"
          py="4"
          _dark={{
            bg: 'gray.800',
          }}
        >
          <Logo />

          <chakra.p
            py={{
              base: '2',
              sm: '0',
            }}
            color="gray.400"
            className="raleway"
            textAlign={'center'}
          >
            Powered by TRON Blockchain
          </chakra.p>
        </Flex>
      </WrapContent>
    </Flex>
  );
}

export default Footer;
