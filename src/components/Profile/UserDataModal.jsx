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
import { setDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';

export default function UserDataModal({ isOpen, onClose, action }) {
  const initialRef = React.useRef(null);
  const { userData, isAuth, getUserData } = useAuth();
  const [loading, setLoading] = useState(false);

  const [name, setName] = React.useState(userData ? userData.name : '');
  const [contact, setContact] = React.useState(
    userData ? userData.contact : ''
  );
  const [avatar, setAvatar] = React.useState(userData ? userData.avatar : '');

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      await setDoc(doc(db, 'users', isAuth), {
        name,

        contact,
        created: Timestamp.now(),
        avatar:
          avatar.trim.length === 0
            ? 'https://source.unsplash.com/random/?portrait'
            : avatar,
      });
      setLoading(false);

      onClose();
      getUserData();
    } catch (err) {
      alert(err);
    }
  };
  const handleUpdate = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'users', isAuth), {
        name,

        contact,
        avatar,
      });
      setLoading(false);

      onClose();
      getUserData();
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    if (action === 'EDIT') {
      setAvatar(userData.avatar);
      setName(userData.name);
      setContact(userData.contact);
    }
    //eslint-disable-next-line
  }, [action]);

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              as="form"
              id="userForm"
              onSubmit={e => {
                if (action === 'ADD') {
                  handleSubmit(e);
                }
                if (action === 'EDIT') {
                  handleUpdate(e);
                }
              }}
            >
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
            <Button
              isLoading={loading}
              form="userForm"
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
