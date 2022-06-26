import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import WrapContent from '../components/layout/WrapContent';
import metamask from '../assets/metamask.png';
import { useAuth } from '../context/AuthContext';
// import ProfileData from '../components/Profile/ProfileData';
import pheader from '../assets/pheader.svg';
import UserDataModal from '../components/Profile/UserDataModal';
import AdsSection from '../components/Profile/AdsSection';
import { useData } from '../context/DataContext';

function Profile() {
  //eslint-disable-next-line
  const { isAuth, userData } = useAuth();
  const { getUserAds, ads } = useData();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [action, setAction] = useState('ADD');

  useEffect(() => {
    if (isAuth) {
      getUserAds();
    }
    //eslint-disable-next-line
  }, [isAuth]);

  return (
    <>
      {!isAuth && (
        <Center flexDir={'column'} minH="90vh">
          <Image py="5" src={metamask} alt="metamask" w="100px" />
          <h1>Connect your wallet to view profile details</h1>
        </Center>
      )}
      {isAuth && (
        <>
          <Box
            mt="-60px"
            bg="blackAlpha.500"
            // bgImage={'url(https://source.unsplash.com/random/?art)'}
            bgImage={`url(${pheader})`}
            bgBlendMode={'overlay'}
            bgSize="cover"
            bgRepeat={'norepeat'}
            bgPosition={'center'}
            color="gray.100"
            pt="130px"
            h="300px"
          />
          <Box mt="-8">
            <WrapContent>
              <Stack
                flexDir={['column', 'column', 'row']}
                justifyContent={'space-between'}
                alignItems={['flex-start', 'flex-start', 'flex-end']}
              >
                <>
                  <HStack spacing={4} alignItems="flex-end">
                    <Avatar
                      border="5px solid #EDF2F7"
                      src={
                        userData
                          ? userData.avatar
                          : 'https://source.unsplash.com/random/?portrait'
                      }
                      size={'xl'}
                      name={userData ? userData.name : 'no name'}
                    />
                    <Box pb={[0, 0, 3]}>
                      <Heading fontSize={['md', 'md', '24px']}>
                        {userData
                          ? userData.name
                          : isAuth.substring(0, 10) + '...'}
                      </Heading>
                      <Text
                        className="raleway"
                        color="gray.600"
                        fontSize={'xs'}
                      >
                        {userData ? userData.contact : 'name & contact not set'}
                      </Text>
                    </Box>
                  </HStack>
                  {!userData && (
                    <Text fontSize="xs" as="i" color="gray.400">
                      You must submit your details to finish sign up
                    </Text>
                  )}
                </>
                <Box pb="4">
                  {userData && (
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      rounded="full"
                      size={'sm'}
                      onClick={() => {
                        setAction('EDIT');
                        onOpen();
                      }}
                    >
                      {' '}
                      Edit Profile{' '}
                    </Button>
                  )}
                  {!userData && (
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      rounded="full"
                      size={'sm'}
                      onClick={() => {
                        setAction('ADD');
                        onOpen();
                      }}
                    >
                      {' '}
                      Finish creating account
                    </Button>
                  )}
                </Box>
              </Stack>
            </WrapContent>
          </Box>
          {/* <ProfileData isAuth={isAuth} data={userData} /> */}
          <AdsSection data={{ ...userData, ads }} />
        </>
      )}
      <UserDataModal action={action} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Profile;
