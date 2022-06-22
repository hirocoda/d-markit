import { Box, Button, Center, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import WrapContent from '../layout/WrapContent';
import emptyIcon from '../../assets/empty.png';
import { FaPlus } from 'react-icons/fa';

const AdsSection = ({ data }) => {
  return (
    <Box py={['20px', '40px']}>
      <WrapContent>
        <Box py={[2, 3, 4]}>
          <Heading as="h2" fontSize={['md', 'lg', 'xl']}>
            Your Ads ({data ? data.ads.length : 0})
          </Heading>
        </Box>
        {/* {!data && !data.ads.length === 0 && ( */}
        <Center flexDir="column" py="5" w="fit-content">
          <Image src={emptyIcon} alt="no ads" w="100px" />
          <Button rounded="full" leftIcon={<FaPlus />}>
            Create an add
          </Button>
        </Center>
        {/* )} */}
      </WrapContent>
    </Box>
  );
};

export default AdsSection;
