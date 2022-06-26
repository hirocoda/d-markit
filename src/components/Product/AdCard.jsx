import {
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { FcCompactCamera, FcChargeBattery } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

function AdCard({ item }) {
  const [loaded, setLoaded] = useState(false);
  const { dispatchAction } = useData();

  return (
    <Box
      onClick={() => dispatchAction('SET_ACTIVE_ITEM', item)}
      bg="white"
      as={Link}
      to={'/item/' + item.id}
    >
      <HStack h="200px" shadow="base" rounded="lg">
        <Box w="40%" bg={!loaded && 'gray.200'} h="100%">
          <Image
            roundedLeft={'lg'}
            onLoad={() => setLoaded(true)}
            alt={item.model + ' ' + item.id}
            src={item.image}
            w="100%"
            h="100%"
            objectFit={'cover'}
          />
        </Box>
        <Stack p="3" w="60%" h="100%">
          <Text className="poppins" fontSize={'lg'}>
            {item.brand + ' ' + item.model}
          </Text>
          <Box fontSize="11px" lineHeight={'1'}>
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
          </Box>
          <Box
            className="poppins"
            textDecoration={'underline'}
            textUnderlineOffset="4px"
            fontSize={'14px'}
          >
            {item.price + ' TRX'}
          </Box>
          <Box>
            {item.tagList.map((t, i) => (
              <Badge
                my="1"
                mr="1"
                colorScheme={'green'}
                className="raleway"
                key={i}
                fontSize="10px"
              >
                {t}
              </Badge>
            ))}
          </Box>
          <Button
            p="0"
            alignSelf={'flex-start'}
            _focus={{
              boxShadow: 'none',
            }}
            size="xs"
            variant="flushed"
            leftIcon={<FaLocationArrow />}
            color="gray.500"
          >
            {item.location}
          </Button>
        </Stack>
      </HStack>
    </Box>
  );
}

export default AdCard;
