import { Avatar, Badge, Box, Button, HStack, Text } from '@chakra-ui/react';
import 'react-image-lightbox/style.css';
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

function ItemDetails({ item }) {
  return (
    <>
      <Box>
        <Text className="raleway" as="h2" fontSize={['24px', '32px']}>
          {item.price + ' ' + item.currency}
        </Text>
        <Text className="poppins" as="h2" fontSize={['22px', '30px']}>
          {item.name}
        </Text>
        <HStack justifyContent={'space-between'}>
          <HStack py="2">
            <Avatar size="sm" name={item.user.name} />
            <Box>
              <Text className="raleway">{item.user.name}</Text>
              <Text className="raleway" fontSize={'10px'}>
                {item.user.contact}
              </Text>
            </Box>
          </HStack>
          <Button size="xs" colorScheme={'green'} leftIcon={<FaPhoneAlt />}>
            Call
          </Button>
        </HStack>
        <Text fontSize={'xs'} className="raleway">
          {item.description}
        </Text>
      </Box>
      <Text fontSize={['14px', 'sm']} className="raleway">
        <b style={{ fontFamily: 'inherit' }}>Brand</b>: {item.brand}
      </Text>
      <Text fontSize={['14px', 'sm']} className="raleway">
        <b style={{ fontFamily: 'inherit' }}>Color</b> :{' '}
        <Badge colorScheme={item.color || 'red'}>{item.color || 'red'}</Badge>
      </Text>
      <Box>
        <Text fontSize={['14px', 'sm']} className="raleway">
          <b style={{ fontFamily: 'inherit' }}>Condition</b> :
        </Text>{' '}
        {item.tags.map((t, i) => (
          <Badge
            my="1"
            mr="1"
            colorScheme={'green'}
            className="raleway"
            key={i}
          >
            {t}
          </Badge>
        ))}
      </Box>
      <Text fontSize={['14px', 'sm']} className="raleway">
        <b style={{ fontFamily: 'inherit' }}>Location</b> :{' '}
        <Box as="i">Item is in {item.location}</Box>
      </Text>
    </>
  );
}

export default ItemDetails;
