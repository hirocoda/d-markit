import {
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import WrapContent from '../layout/WrapContent';
import { Link } from 'react-router-dom';
import { phonesData } from '../../data/fakedata';
import AdCard from './AdCard';

function ProductPage() {
  const { category } = useParams();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      switch (category) {
        case 'phones':
          setItems(phonesData);
          setLoading(false);
          break;

        default:
          setLoading(false);

          break;
      }
    }, 2500);
  }, [category]);

  return (
    <Box pt="40px" minH="100vh">
      <WrapContent>
        <HStack
          alignItems={'flex-end'}
          justifyContent={'space-between'}
          py="20px"
        >
          <Box>
            <Badge className="raleway" colorScheme={'yellow'} fontSize="9px">
              CATEGORY
            </Badge>
            <HStack>
              <IconButton
                as={Link}
                to="/marketplace"
                size="sm"
                variant="ghost"
                fontSize="24px"
                icon={<FaAngleLeft />}
              />

              <Heading
                as="h2"
                fontSize={['lg', 'xl', '2xl']}
                textTransform="capitalize"
              >
                {category}
              </Heading>
            </HStack>
          </Box>
          <HStack spacing="4">
            <Text>Sort: </Text>
            <Select
              size="sm"
              placeholder="select"
              borderColor="green.500"
              border="1px solid"
              rounded="full"
            >
              <option value="Region">Region</option>
              <option value="Price">Price</option>
              <option value="Condition">Condition</option>
            </Select>
          </HStack>
        </HStack>
        {loading && (
          <Center py="10">
            <Text>LOADING ...</Text>
          </Center>
        )}
        {!loading && items === null && (
          <Center py="10">
            <Text fontSize={'xl'} color="red.500">
              Can't load items for selected category
            </Text>
          </Center>
        )}
        <SimpleGrid columns={[1, 1, 2]} spacing="8">
          {!loading &&
            items &&
            items.map((item, i) => <AdCard key={i} item={item} />)}
        </SimpleGrid>
      </WrapContent>
    </Box>
  );
}

export default ProductPage;
