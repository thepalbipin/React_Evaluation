import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Heading, 
  Stack, 
  StackDivider, 
  Text, 
  CardFooter, 
  Button, 
  Box, 
  useToast, 
  useDisclosure, 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogContent, 
  AlertDialogOverlay 
} from "@chakra-ui/react";
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';

export default function ProductDetail() {
  const {id} = useParams();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  async function fetchProduct(id){
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`,
      });

      let data = response?.data;
      setLoading(false);
      setProduct(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(()=>{
    fetchProduct(id);
  }, [id]);

  const confirmAddToCart = () => {
    addToCart();
    onClose();
  };

  async function addToCart(){
    toast({
      title: "Item added to cart.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <Box padding="6">
      {loading && <LoadingIndicator />}
      {error && <ErrorIndicator />}
      {product && (
        <Card>
          <CardHeader>
            <Heading size='md'>{product.title}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Text>Brand: {product.brand}</Text>
                <Text>Category: {product.category}</Text>
                <Text>Price: ${product.price}</Text>
                <Text>Description: {product.description}</Text>
              </Box>
            </Stack>
          </CardBody>
          <CardFooter>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Add to Cart
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to add this item to cart?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme="red" onClick={confirmAddToCart} ml={3}>
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button colorScheme='red' onClick={onOpen}>Add to Cart</Button>
          </CardFooter>
        </Card>
      )}
    </Box>
  );
}
