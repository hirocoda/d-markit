import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { categories } from '../../data/fakedata';
import WrapContent from '../layout/WrapContent';
import { Link } from 'react-router-dom';

function CategoryGrid({
  asLink = true,
  addBtn = true,
  title = 'Ad Categories',
  setter = null,
}) {
  return (
    <WrapContent>
      <HStack justifyContent={'space-between'} py="10">
        <Heading as="h2" fontSize={['md', 'lg', 'xl']}>
          {title}
        </Heading>
        {addBtn && (
          <Button
            rounded="full"
            colorScheme={'green'}
            size="sm"
            variant="outline"
            fontFamily={'raleway'}
            leftIcon={<FaPlus />}
            as={Link}
            to="/create_ad"
          >
            Post an ad
          </Button>
        )}
      </HStack>

      <SimpleGrid columns={[2, 3, 5, 6]} spacing="4">
        {categories.map((c, i) => (
          <CategoryCard key={i} c={c} asLink={asLink} setter={setter} />
        ))}
        {addBtn && (
          <Center as={Link} to="/create_ad" flexDir="column" py="5">
            <Icon as={FaPlus} fontSize="50px" color="green.500" />
            <Text className="raleway" py="3" textAlign="center">
              Post your ad
            </Text>
          </Center>
        )}
      </SimpleGrid>
    </WrapContent>
  );
}

export default CategoryGrid;

const CategoryCard = ({ c, asLink, setter }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Center
      transition={'all .3s ease'}
      _hover={{
        bg: 'gray.200',
        color: 'green',
      }}
      flexDir="column"
      py="5"
      as={asLink ? Link : Center}
      to={`/category/${c.id}`}
      onClick={() => {
        setter && setter(c.id);
      }}
    >
      <Box w="90px" rounded={'full'} h="90px" bg={!loaded && 'gray.200'}>
        <Image
          rounded="full"
          h="90px"
          src={c.image}
          alt={c.name + 'category'}
          objectFit="contain"
          onLoad={() => setLoaded(true)}
        />
      </Box>

      <Text className="raleway" py="3" textAlign="center">
        {c.name}
      </Text>
    </Center>
  );
};
