import { Button, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { FaUserCheck, FaUserMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AuthButtons() {
  const { dispatchAuthAction, isAuth, userData } = useAuth();

  return (
    <>
      {!isAuth && (
        <ButtonGroup>
          {/* {not_mobile && ( */}
          <Button
            onClick={() => dispatchAuthAction('CONNECT', null)}
            size="sm"
            colorScheme={'purple'}
            rounded="full"
          >
            Connect
          </Button>
          {/* )} */}
        </ButtonGroup>
      )}
      {isAuth && (
        <Link to="/profile">
          <Button
            colorScheme="green"
            variant="outline"
            rounded="full"
            size="sm"
            leftIcon={
              userData ? (
                <FaUserCheck />
              ) : (
                <FaUserMinus style={{ color: 'red' }} />
              )
            }
          >
            {isAuth.substring(0, 3) + '...'}
          </Button>
        </Link>
      )}
    </>
  );
}

export default AuthButtons;
