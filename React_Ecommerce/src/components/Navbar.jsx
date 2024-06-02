import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink, Flex, Button, Box, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';


const links = [
  { to: "/", label: "HOME" },
];

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const { authDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Flex 
      align="center" 
      justify="space-around" 
      fontWeight="semibold" 
      bg="gray.200" 
      padding="4">
      <Box>
        {authDetails.isAuthenticated ? (
          <Text>{authDetails.email}</Text>
        ) : null}
      </Box>
      <Flex
        align="center" 
        justify="space-around" 
        fontWeight="semibold" 
        bg="gray.200" 
        padding="4">
        {authDetails.isAuthenticated ? (
          <>
            {links.map((link) => (
              <ChakraLink 
                as={ReactRouterLink} 
                color="red.600"
                key={link.to} 
                to={link.to}
              >
                {link.label}
              </ChakraLink>
            ))}

            <Button 
            colorScheme='red' 
            variant='solid' 
            onClick={logout}>LOGOUT</Button>
          </>
        ) : (
          <Button 
            colorScheme='red' 
            variant='solid' 
            onClick={() => navigate('/login')}
          >
            LOGIN
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

