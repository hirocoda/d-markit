import {
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  VStack,
} from '@chakra-ui/react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import React, { useCallback, useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import WrapContent from '../components/layout/WrapContent';
import { useData } from '../context/DataContext';
import { phonesData } from '../data/fakedata';
import SafetyAlert from '../components/Product/SafetyAlert';
import PayNow from '../components/Product/PayNow';
import ItemDetails from '../components/Product/ItemDetails';

const imagesArr = [
  'https://source.unsplash.com/random/400x400/?telephone',
  'https://source.unsplash.com/random/400x400/?mobilephone',
  'https://source.unsplash.com/random/400x400/?handset',
];

function Item() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [item, setItem] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const { id } = useParams();
  const { activeItem } = useData();

  const fetchItem = useCallback(() => {
    let item = phonesData.filter(i => i.id === id)[0];
    setItem(item);
    setImages([item.image, ...imagesArr]);

    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (activeItem) {
      setItem(activeItem);
      setLoading(false);
    } else {
      fetchItem();
    }
  }, [activeItem, fetchItem]);

  return (
    <Box py={['20px', '20px', '40px']}>
      {loading && (
        <Center minH="80vh">
          <Spinner
            size="xl"
            color="green"
            emptyColor="yellow.100"
            speed="0.5s"
          />
        </Center>
      )}
      <WrapContent>
        <Box py="4">
          <Badge className="raleway" colorScheme={'yellow'} fontSize="9px">
            Back to
          </Badge>
          <HStack>
            <IconButton
              as={Link}
              to={'/category/' + item.category}
              size="sm"
              variant="ghost"
              fontSize="24px"
              icon={<FaAngleLeft />}
            />

            <Heading
              as="h2"
              fontSize={['lg', 'xl', '2xl']}
              textTransform="capitalize"
            >
              {item.category}
            </Heading>
          </HStack>
        </Box>
        {item && !loading && (
          <SimpleGrid columns={[1, 1, 2]} spacing="5">
            <HStack spacing="2" alignItems={'flex-start'}>
              <VStack spacing="2">
                {images.map((i, idx) => (
                  <Image
                    onClick={() => setActiveImageIndex(idx)}
                    key={idx}
                    border={
                      activeImageIndex === idx ? '2px solid coral' : 'none'
                    }
                    maxH={['35px', '50px']}
                    minW={['35px', '50px']}
                    src={i}
                    h="100%"
                    objectFit="contain"
                  />
                ))}
              </VStack>
              <Box>
                <Image
                  src={images[activeImageIndex]}
                  m="auto"
                  h="90%"
                  maxH="400px"
                  objectFit="cover"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
                {isOpen && (
                  <Lightbox
                    mainSrc={images[activeImageIndex]}
                    nextSrc={images[(activeImageIndex + 1) % images.length]}
                    prevSrc={images[activeImageIndex - 1]}
                    onCloseRequest={() => setOpen(false)}
                    onMovePrevRequest={() =>
                      setActiveImageIndex(
                        (activeImageIndex + images.length - 1) % images.length
                      )
                    }
                    onMoveNextRequest={() =>
                      setActiveImageIndex(
                        (activeImageIndex + 1) % images.length
                      )
                    }
                  />
                )}
              </Box>
            </HStack>

            <Stack spacing="3">
              <ItemDetails item={item} />
              <SafetyAlert />
              <PayNow item={item} />
            </Stack>
          </SimpleGrid>
        )}
      </WrapContent>
    </Box>
  );
}

export default Item;
