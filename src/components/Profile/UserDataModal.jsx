import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function UserDataModal({ isOpen, onClose }) {
  const initialRef = React.useRef(null);
  const { userData } = useAuth();

  const [name, setName] = React.useState(userData ? userData.name : '');
  const [contact, setContact] = React.useState(
    userData ? userData.contact : ''
  );
  const [avatar, setAvatar] = React.useState(userData ? userData.avatar : '');

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box as="form" id="userForm">
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  ref={initialRef}
                  placeholder="Full name"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Phone Contact</FormLabel>
                <Input
                  value={contact}
                  type="tel"
                  onChange={e => setContact(e.target.value)}
                  placeholder="Contact"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Avatar url</FormLabel>
                <Input
                  value={avatar}
                  type="url"
                  onChange={e => setAvatar(e.target.value)}
                  placeholder="avatar url"
                />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button form="userForm" type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
