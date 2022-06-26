import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import WrapContent from '../layout/WrapContent';
import emptyIcon from '../../assets/empty.png';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdCard from '../Product/AdCard';

const AdsSection = ({ data }) => {
  return (
    <Box py="20px">
      <WrapContent>
        <Box py={[2, 3, 4]}>
          <Heading as="h2" fontSize={['md', 'lg', 'xl']}>
            Your Ads ({data ? data.ads.length : 0})
          </Heading>
        </Box>
        {data && data.ads.length === 0 && (
          <Center flexDir="column" py="5" w="fit-content">
            <Image src={emptyIcon} alt="no ads" w="100px" />
            <Button
              as={Link}
              className="raleway"
              to="/create_ad"
              rounded="full"
              leftIcon={<FaPlus />}
            >
              Create an add
            </Button>
          </Center>
        )}
        <SimpleGrid columns={[1, 1, 2]} spacing="8">
          {data && data.ads.map((a, i) => <AdCard key={i} item={a} />)}
        </SimpleGrid>
      </WrapContent>
    </Box>
  );
};

export default AdsSection;
