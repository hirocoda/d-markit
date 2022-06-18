import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
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
      rounded="lg"
      shadow="base"
    >
      <HStack h="200px">
        <Box w="40%" bg={!loaded && 'gray.200'} h="100%">
          <Image
            roundedLeft={'lg'}
            onLoad={() => setLoaded(true)}
            alt={item.name + ' ' + item.id}
            src={item.image}
            w="100%"
            h="100%"
            objectFit={'cover'}
          />
        </Box>
        <Stack justifyContent={'space-between'} p="4" w="60%" h="100%">
          <Text className="poppins" fontSize={'xl'}>
            {item.name}
          </Text>
          <Box
            className="poppins"
            textDecoration={'underline'}
            textUnderlineOffset="4px"
          >
            {item.price + ' ' + item.currency}
          </Box>
          <Box>
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
