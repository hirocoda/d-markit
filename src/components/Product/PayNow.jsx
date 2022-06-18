import { Button, HStack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

function PayNow({ item }) {
  const toast = useToast();
  const { user } = useAuth();
  const handlepay = () => {
    if (!user) {
      toast({
        position: 'bottom-right',
        status: 'error',
        isClosable: true,
        title: 'Auth error',
        description: 'Please connect wallet to make payments',
      });
    }
  };
  return (
    <HStack p="4" bg="white" justifyContent={'space-between'}>
      <Text fontSize="sm" className="raleway">
        Make payment :{' '}
      </Text>
      <Button onClick={handlepay} size="sm" rounded="full" colorScheme="blue">
        Pay {item.price + ' ' + item.currency}
      </Button>
    </HStack>
  );
}

export default PayNow;
