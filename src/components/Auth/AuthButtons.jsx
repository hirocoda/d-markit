import { Button, ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function AuthButtons() {
  const not_mobile = useBreakpointValue([false, false, true, true]);

  return (
    <ButtonGroup>
      {not_mobile && (
        <Button size={['xs', 'sm']} rounded="full" variant={'ghost'}>
          <Link to="/login">Login</Link>
        </Button>
      )}
      <Button size={['xs', 'sm']} rounded="full" colorScheme={'purple'}>
        <Link to="/signup">Signup</Link>
      </Button>
    </ButtonGroup>
  );
}

export default AuthButtons;
