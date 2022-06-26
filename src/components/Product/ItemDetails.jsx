import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import 'react-image-lightbox/style.css';
import React from 'react';
import { FaMemory, FaPhoneAlt } from 'react-icons/fa';
import { FcChargeBattery, FcCompactCamera } from 'react-icons/fc';

function ItemDetails({ item }) {
  return (
    <>
      <Box>
        <Text className="raleway" as="h2" fontSize={['20px', '28px']}>
          {item.price + ' ' + item.currency}
        </Text>
        <Text className="poppins" as="h2" fontSize={['22px', '30px']}>
          {item.brand + ' ' + item.model}
        </Text>
        <Box fontSize="15px" py="4">
          <HStack alignItems={'flex-start'}>
            <Box>
              <Icon as={FcChargeBattery} />
            </Box>
            <Text as="small">{item.battery}</Text>
          </HStack>
          <HStack alignItems={'flex-start'}>
            <Box>
              <Icon as={FcCompactCamera} />
            </Box>
            <Text as="small">{item.camera}</Text>
          </HStack>
          <HStack alignItems={'flex-start'}>
            <Box>
              <Icon as={FaMemory} />
            </Box>
            <Text as="small">{item.ram} RAM</Text>
          </HStack>
        </Box>
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
        <b style={{ fontFamily: 'inherit' }}>Model</b>: {item.model}
      </Text>
      <Text fontSize={['14px', 'sm']} className="raleway">
        <b style={{ fontFamily: 'inherit' }}>Color</b> :{' '}
        <Badge colorScheme={item.color || 'red'}>{item.color || 'red'}</Badge>
      </Text>
      <Box>
        <Text fontSize={['14px', 'sm']} className="raleway">
          <b style={{ fontFamily: 'inherit' }}>Condition</b> :
        </Text>{' '}
        {item.tagList.map((t, i) => (
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
