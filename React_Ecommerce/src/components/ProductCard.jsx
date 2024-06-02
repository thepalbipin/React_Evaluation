import { 
  Box, 
  Card, 
  CardHeader, 
  CardBody, 
  Heading, 
  Stack, 
  StackDivider, 
  Text, 
  CardFooter, 
  Button,
  Image 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ id, title, brand, category, price, image }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <Box boxSize='md'>
          <Image src={image} alt={title} />
        </Box>
        <Heading size='md'>{title}</Heading>
      </CardHeader>
      <CardBody>
        <Box>
            <Text pt='2' fontSize='sm'>Brand: {brand}</Text>
          <Stack divider={<StackDivider />} spacing='4'>
            <Text>Category: {category}</Text>
            <Text>Price: ${price}</Text>
          </Stack>
        </Box>
      </CardBody>
      <CardFooter>
        <Button 
          variant='solid' 
          colorScheme='red'
          onClick={() => navigate(`/product/view/${id}`)}
        >
          More Details
        </Button>
      </CardFooter>
    </Card>
  );
}
