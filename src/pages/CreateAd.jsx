import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { lazy, Suspense, useState } from 'react';
import WrapContent from '../components/layout/WrapContent';
import { useAuth } from '../context/AuthContext';
import metamask from '../assets/metamask.png';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import CategoryGrid from '../components/marketplace/CategoryGrid';
import { AnimatePresenceInOut } from '../components/motion/AnimatePresenceInOut';
const PhoneAdForm = lazy(() => import('../components/CreateAd/PhoneAdForm'));

function CreateAd() {
  const [stepRef, setStep] = useState(1);
  const { isAuth } = useAuth();
  const [category, setCategory] = useState(null);
  return (
    <Box py={['20px', '20px', '40px']}>
      <WrapContent>
        {!isAuth && (
          <Center flexDir={'column'} minH="90vh">
            <Image py="5" src={metamask} alt="metamask" w="100px" />
            <h1>Connect your wallet to continue</h1>
          </Center>
        )}
        <Box py="4" minH={'70vh'}>
          <HStack>
            <IconButton
              as={stepRef === 1 ? Link : Box}
              to={'/marketplace'}
              size="sm"
              variant="ghost"
              fontSize="24px"
              icon={<FaAngleLeft />}
              onClick={() => {
                if (stepRef !== 1) {
                  setStep(1);
                }
              }}
            />

            <Heading as="h2" fontSize={['lg', 'xl', '2xl']}>
              Create Ad : {stepRef === 1 ? 'select catgory' : 'add details'}
            </Heading>
          </HStack>
          <AnimatePresenceInOut isVisible={stepRef === 1}>
            <Box mt="-10">
              <CategoryGrid
                asLink={false}
                title={''}
                addBtn={false}
                setter={v => {
                  setCategory(v);
                  setStep(2);
                }}
              />
            </Box>
          </AnimatePresenceInOut>
          <Suspense
            fallback={
              <Center>
                <Spinner size="xl" />
              </Center>
            }
          >
            <AnimatePresenceInOut isVisible={stepRef === 2}>
              {category && category === 'phones' && (
                <PhoneAdForm category={category} />
              )}
              {category && category !== 'phones' && (
                <Center>
                  <Text>COMING SOON</Text>
                </Center>
              )}
            </AnimatePresenceInOut>
          </Suspense>
        </Box>
      </WrapContent>
    </Box>
  );
}

export default CreateAd;
