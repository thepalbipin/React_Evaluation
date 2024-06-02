import { useState, useContext, useEffect } from "react";
import { Container, VStack, Input, Button, Heading, useToast } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, authDetails: {isAuthenticated}} = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    document.getElementById("emailInput").focus();
  }, []);

  async function handleSubmit(){
    try {
      const response = await axios({
        method: "post",
        url: "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",
        data: {
          email,
          password,
        },
      });

      login(response?.data?.token, email);

    } catch (error) {
      toast({
        title: "Error logging in.",
        description: "Please check your credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  if(isAuthenticated){
    return <Navigate to="/" />;
  }

  return (
    <Container maxW={450}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Login</Heading>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

        <Button 
          colorScheme="red"
          variant='solid'
          onClick={handleSubmit}>
          LOGIN
        </Button>
      </VStack>
    </Container>
  );
}