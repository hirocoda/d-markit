import React from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import WrapContent from '../layout/WrapContent';

function Header() {
  const inputRef = React.useRef();

  return (
    <Box mt="-60px" bg="brand.500" color="gray.100" pt="130px" h="65vh">
      <WrapContent>
        <Center flexDir={'column'} h="full" py="10" as="form">
          <Heading as="h1" fontSize={'24px'}>
            Find anything in your location!
          </Heading>
          <FormControl isRequired w="full" maxW="lg" py="5">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Box fontSize={'24px'} mt="2" color="gray.400">
                    <FaSearch />
                  </Box>
                }
              />
              <Input
                ref={inputRef}
                w="full"
                maxW="lg"
                size="lg"
                placeholder="what are you looking for?"
              />
            </InputGroup>
            <Center py="5">
              <Button type="submit" colorScheme={'green'}>
                Search now
              </Button>
            </Center>
          </FormControl>
        </Center>
      </WrapContent>
    </Box>
  );
}

export default Header;
