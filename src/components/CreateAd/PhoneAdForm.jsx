import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  FaBatteryHalf,
  FaCaretDown,
  FaLocationArrow,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { CgNametag } from 'react-icons/cg';
import { BsCamera, BsCursor, BsPhone } from 'react-icons/bs';
import { Select } from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const tags = [
  'brand new',
  'good condition',
  'fairly used',
  'no repairs',
  'repairs',
];

function PhoneAdForm({ category }) {
  const { isAuth, userData } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState({
    message: 'uploading image',
    loading: false,
  });
  const [image, setImage] = useState(null);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tagList, setTag] = useState([]);

  const handleImage = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!image || tagList.length === 0) {
      return toast({
        title: 'incomplete data',
        status: 'warning',
        isClosable: true,
        position: 'bottom-right',
        description: 'provide all data required: IMAGE or TAGS missing',
      });
    }
    const brand = e.target.brand.value;
    const model = e.target.model.value;
    const color = e.target.color.value;
    const camera = e.target.camera.value;
    const ram = e.target.ram.value;
    const battery = e.target.battery.value;
    const location = e.target.location.value;
    const delivery = e.target.delivery.value;
    const price = e.target.price.value;
    const description = e.target.description.value;

    const data = {
      tagList,
      currency: 'TRX',
      category,
      brand,
      model,
      color,
      camera,
      battery,
      price,
      location,
      delivery,
      description,
      ram,
    };
    setLoading({ message: 'uploading image', loading: true });
    UploadImage(data);
  };

  const UploadImage = data => {
    const datetime = new Date().getTime();
    const reff =
      data.brand +
      '_' +
      data.model +
      '_' +
      isAuth.substring(0, 5) +
      '_' +
      datetime;
    const storageRef = ref(storage, `/images/${reff + image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            return;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
          PublishAd({ ...data, image: downloadURL });
        });
      }
    );

    const PublishAd = async data => {
      setLoading({ message: 'publishing ad', loading: true });
      try {
        await addDoc(collection(db, 'ads'), {
          ...data,
          user: userData,
          created: Timestamp.now(),
        });
        setLoading({ message: 'done', loading: false });
        setDone(true);
      } catch (err) {
        setLoading({ message: 'done', loading: false });
        alert(err);
      }
    };
  };
  return (
    <Stack spacing={4} bg="white" shadow="base" p="4" rounded="xl">
      <Text fontSize="sm" as="i">
        {done ? 'Phone ad created' : 'You are creating an ad for Phones.'}
      </Text>
      {!done && (
        <Stack spacing="4" as="form" onSubmit={handleSubmit}>
          <Text>Add Photo</Text>
          <FormControl>
            <FormLabel htmlFor="image" h="250px" w="250px" bg="gray.100">
              {image && (
                <Image
                  maxW="full"
                  height="full"
                  alt="upload"
                  src={URL.createObjectURL(image)}
                />
              )}
              {image && (
                <Text fontSize="sm" as="i" color="gray.600">
                  *click to change
                </Text>
              )}
              {!image && (
                <Center h="100%">
                  <Text>Click to add image</Text>
                </Center>
              )}
            </FormLabel>

            <Input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              hidden
              onChange={handleImage}
            />
          </FormControl>
          <SimpleGrid columns={['1', 1, '2']} spacing="4">
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="blue.400" pt="2">
                      <CgNametag />
                    </Box>
                  }
                />

                <Input
                  type="text"
                  size="lg"
                  name="brand"
                  placeholder="phone brand"
                  list="brands"
                />
                <datalist id="brands">
                  <option value="Apple">Apple</option>
                  <option value="Sony">Sony</option>
                  <option value="Motorola">Motorola</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Nokia">Nokia</option>
                  <option value="Huawei">Huawei</option>
                  <option value="Infinix">Infinix</option>
                  <option value="Tecno">Tecno</option>
                  <option value="Itel">Itel</option>
                  <option value="Nec-3">Nec-3</option>
                  <option value="Siemens">Siemens</option>
                  <option value="Oppo">Oppo</option>
                  <option value="Redmi">Redmi</option>
                </datalist>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="blue.400" pt="2">
                      <BsPhone />
                    </Box>
                  }
                />

                <Input
                  type="text"
                  size="lg"
                  name="model"
                  placeholder="phone model"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="blue.400" pt="2">
                      <BsCursor />
                    </Box>
                  }
                />

                <Input
                  type="text"
                  list="colors"
                  size="lg"
                  name="color"
                  placeholder="color"
                />
                <datalist id="colors">
                  <option value="Red">Red</option>
                  <option value="Black">Black</option>
                  <option value="Green">Green</option>
                  <option value="Blue">Blue</option>
                  <option value="Purple">Purple</option>
                  <option value="Pink">Pink</option>
                  <option value="Silver">Silver</option>
                  <option value="White">White</option>
                </datalist>
              </InputGroup>
            </FormControl>

            <FormControl isRequired py="2">
              <Select
                name="ram"
                icon={<FaCaretDown />}
                placeholder="RAM size"
                size="lg"
              >
                <option value="<512Mb"> less than 512 Mb</option>
                <option value={'512Mb'}>512 Mb</option>
                <option value="1 GB">1 GB</option>
                <option value="2 GB">2 GB</option>
                <option value="3 GB">3 GB</option>
                <option value="4 GB">4 GB</option>
                <option value="6 GB">6 GB</option>
                <option value="8 GB">8 GB</option>
                <option value="10 GB">10 GB</option>
                <option value="16 GB">16 GB</option>
                <option value="> 16 GB"> 16 GB+ </option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="blue.400" pt="2">
                      <FaBatteryHalf />
                    </Box>
                  }
                />

                <Input
                  type="text"
                  list="battery"
                  size="lg"
                  name="battery"
                  placeholder="battery capacity"
                />
                <datalist id="battery">
                  <option value="1400 mA">1400 mA</option>
                  <option value="2800 mA">2800 mA</option>
                  <option value="3400 mA">3400 mA</option>
                  <option value="4800 mA">4800 mA</option>
                  <option value="5000 mA">5000 mA</option>
                  <option value=">5000 mA">{'>5000 mA'}</option>
                </datalist>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="blue.400" pt="2">
                      <BsCamera />
                    </Box>
                  }
                />

                <Input
                  type="text"
                  size="lg"
                  name="camera"
                  list="camera"
                  placeholder="camera"
                />
                <datalist id="camera">
                  <option value="<2MP">{'<2MP'}</option>
                  <option value="2MP">2MP</option>
                  <option value="4MP">4MP</option>
                  <option value="8MP">8MP</option>
                  <option value="12MP">12MP</option>
                  <option value="16MP">16MP</option>
                  <option value="32MP">32MP</option>
                  <option value="48MP">48MP</option>
                </datalist>
              </InputGroup>
            </FormControl>
            <FormControl isRequired py="2">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="blue.400" pt="2">
                      <FaLocationArrow />
                    </Box>
                  }
                />

                <Input
                  type="text"
                  size="lg"
                  name="location"
                  placeholder="write location"
                  list="locale"
                />
                <datalist id="locale">
                  <option value="Uyo">{'Uyo'}</option>
                  <option value="Lagos">{'Lagos'}</option>
                  <option value="Texas">{'Texas'}</option>
                  <option value="Vegas">{'Vegas'}</option>
                  <option value="Dublin">{'Dublin'}</option>
                </datalist>
              </InputGroup>
            </FormControl>
            <FormControl isRequired py="2">
              <Select
                placeholder="delivery available?"
                size="lg"
                icon={<FaCaretDown />}
                name="delivery"
              >
                <option value={'no'}>No delivery</option>
                <option value="yes">Yes</option>
              </Select>
            </FormControl>
            <FormControl isRequired py="2">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="blue.400" pt="2">
                      <FaMoneyBillWave />
                    </Box>
                  }
                />

                <Input
                  type="number"
                  min="1"
                  size="lg"
                  name="price"
                  placeholder="price in TRX"
                />
              </InputGroup>
            </FormControl>
          </SimpleGrid>
          <FormControl isRequired>
            <Textarea
              name="description"
              size={'lg'}
              resize={'none'}
              placeholder="write a short description"
            />
          </FormControl>
          {/* tags */}
          <Box>
            <Text>Add Tags</Text>
            <Flex wrap={'wrap'} spacing="3">
              {tags.map((t, i) => (
                <TagBadge key={i} tagList={tagList} value={t} setTag={setTag} />
              ))}
            </Flex>
          </Box>
          <HStack justifyContent={'flex-end'} py="4">
            {loading.loading && (
              <CircularProgress value={progress} color="green.400">
                <CircularProgressLabel>{progress}%</CircularProgressLabel>
              </CircularProgress>
            )}
            <Button
              size="lg"
              rounded="full"
              colorScheme={'green'}
              type="submit"
              display="flex"
              px="60px"
              isLoading={loading.loading}
              loadingText={loading.message}
              fontSize={loading.loading ? 'sm' : 'lg'}
              disabled={!isAuth}
            >
              Post ad
            </Button>
          </HStack>
        </Stack>
      )}

      {done && (
        <Center>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Ad submitted!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Your ad has been create and will be visible to buyers on our site!
            </AlertDescription>
          </Alert>
        </Center>
      )}
    </Stack>
  );
}

export default PhoneAdForm;

function TagBadge({ tagList, value, setTag }) {
  const [cs, setCs] = useState(false);
  const computeState = arr => {
    switch (arr.includes(value)) {
      case true:
        setCs(true);
        break;
      case false:
        setCs(false);
        break;

      default:
        break;
    }
  };
  const handleClick = () => {
    let idx = tagList.indexOf(value);
    if (idx === -1) {
      let arr = tagList;
      arr.push(value);
      setTag(arr);
      computeState(arr);
    } else {
      let arr = tagList;
      arr.splice(idx, 1);
      setTag(arr);
      computeState(arr);
    }
  };

  return (
    <Badge
      m="1"
      cursor={'pointer'}
      size="sm"
      onClick={handleClick}
      variant="outline"
      rounded="full"
      p="2"
      colorScheme={cs ? 'green' : null}
    >
      {value}
    </Badge>
  );
}
