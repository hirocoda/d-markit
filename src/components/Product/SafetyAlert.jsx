import {
  Alert,
  AlertDescription,
  ListItem,
  UnorderedList,
  AlertTitle,
} from '@chakra-ui/react';
import React from 'react';

export default function SafetyAlert() {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <AlertTitle className="poppins" mt={4} mb={1} fontSize="lg">
        For your safety :
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <UnorderedList fontSize="xs">
          <ListItem className="raleway">
            Don't pay in advance, including for delivery
          </ListItem>
          <ListItem className="raleway">
            {' '}
            Meet the seller at a safe public place
          </ListItem>
          <ListItem className="raleway">
            Inspect the item and ensure it's exactly what you want
          </ListItem>
          <ListItem className="raleway">
            On delivery, check that the item delivered is what was inspected
          </ListItem>
          <ListItem className="raleway">
            Pay by clicking the PAY NOW button only when you're satisfied.
          </ListItem>
        </UnorderedList>
      </AlertDescription>
    </Alert>
  );
}
