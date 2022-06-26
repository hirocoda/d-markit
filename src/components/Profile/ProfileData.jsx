import { Box, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import WrapContent from '../layout/WrapContent';
import metamask from '../../assets/metamask.png';

const ProfileData = ({ isAuth, data }) => {
  return (
    <Box py={['20px', '40px']}>
      <WrapContent>
        <Box py={[2, 3, 4]}>
          <Heading as="h2" fontSize={['md', 'lg', 'xl']}>
            Profile Information
          </Heading>
        </Box>
        <Stack spacing="4">
          <HStack spacing={2} alignItems="flex-start">
            <Image src={metamask} w="20px" h="20px" alt="metamask" />
            <Text fontSize={'xs'}>{isAuth.substring(0, 20)}...</Text>
          </HStack>
          <Box>
            <Text as="b" fontSize="sm" color="gray.600" className="raleway">
              Name :
            </Text>
            <Text>{data ? data.name : 'Name not set'}</Text>
          </Box>
          <Box>
            <Text as="b" fontSize="sm" color="gray.600" className="raleway">
              Contact :
            </Text>
            <Text>{data ? data.contact : 'Contact not set'}</Text>
          </Box>
        </Stack>
      </WrapContent>
    </Box>
  );
};

export default ProfileData;
