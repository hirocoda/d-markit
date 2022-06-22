import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
import AuthButtons from '../Auth/AuthButtons';
import WrapContent from './WrapContent';
import { HiMenuAlt3 } from 'react-icons/hi';

const nav = [
  {
    link: '/marketplace',
    name: 'Marketplace',
  },
  {
    link: '/discover',
    name: 'Discover',
  },
  {
    link: '/faq',
    name: 'FAQ',
  },
  {
    link: '/contact',
    name: 'Contact',
  },
];

function Header() {
  const mobile = useBreakpointValue([true, true, false, false]);
  const not_mobile = useBreakpointValue([false, false, true, true]);
  return (
    <Box position={'sticky'} top={['10px', '20px', '30px']} zIndex="10">
      <WrapContent>
        <Box bg="white" rounded="full" shadow="base">
          <WrapContent>
            <HStack py={[2, 3]} justifyContent={'space-between'}>
              <HStack spacing="5">
                <Logo />

                {not_mobile && (
                  <HStack spacing="4">
                    {nav.map((n, i) => (
                      <Link to={n.link} key={i}>
                        {n.name}
                      </Link>
                    ))}
                  </HStack>
                )}
              </HStack>
              <HStack spacing={'1'}>
                <AuthButtons />

                {mobile && (
                  <>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        px="0"
                        size="sm"
                        rounded="sm"
                        variant="flushed"
                        fontSize="22px"
                        icon={<HiMenuAlt3 />}
                        _focus={{
                          boxShadow: 'none',
                          bg: 'gray.50',
                        }}
                      />
                      <MenuList>
                        <MenuItem p="0" fontSize={['sm', 'md']}>
                          <Link
                            style={{
                              padding: '8px 10px',
                              display: 'block',
                              width: '100%',
                            }}
                            to="/login"
                          >
                            Login
                          </Link>
                        </MenuItem>

                        {nav.map((n, i) => (
                          <MenuItem p="0" key={i} fontSize={['sm', 'md']}>
                            <Link
                              style={{
                                padding: '8px 10px',
                                display: 'block',
                                width: '100%',
                              }}
                              to={n.link}
                            >
                              {n.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </>
                )}
              </HStack>
            </HStack>
          </WrapContent>
        </Box>
      </WrapContent>
    </Box>
  );
}

export default Header;
