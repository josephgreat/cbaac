import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Img,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/token/`,
        formData
      );
      const { access_token, refresh_token } = response.data;
      Cookies.set("access_token", access_token, { expires: 1 });
      Cookies.set("refresh_token", refresh_token, { expires: 7 });
      console.log("Login successful:", response.data);
      window.location.href = "/admin/registered-users";
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = Cookies.get("refresh_token");
      if (!refreshToken) {
        console.error("No refresh token available");
        window.location.href = "/admin/login";
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/token/refresh/`,
        { refresh_token: refreshToken }
      );

      const { access_token } = response.data;
      Cookies.set("access_token", access_token, { expires: 1 });
      console.log("Access token refreshed successfully");
    } catch (error) {
      console.error("Error refreshing access token:", error);
      window.location.href = "/admin/login";
    }
  };



  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      //   bg="gray.100"
      pos="relative"
      w="100vw"
    >
      <Box
        pos={{ base: "fixed", md: "relative" }}
        inset={{ base: "0", md: "unset" }}
        w={{ md: "50%" }}
        h="100%"
        zIndex={{ base: "1", md: "unset" }}
      >
        <Box
          bg="url('/images/cbaac_flyer.jpg') no-repeat top center"
          filter={{ base: "blur(2px) brightness(.8)", md: "unset" }}
          bgSize={"cover"}
          w="100%"
          h="100%"
        />
        {/* <Box
          pos="absolute"
          zIndex={1}
          inset={0}
          bg={{ base: "whiteAlpha.800", md: "unset" }}
        /> */}
      </Box>
      <Center w={{ md: "50%" }} maxW={"85vw"} zIndex={2}>
        <VStack
          bg="white"
          shadow={"lg"}
          minW="30vw"
          rounded={"md"}
          w="fit-content"
          p="6"
        >
          <HStack>
            <Img
              src="images/cbaac_logo.png"
              alt="CBAAC Logo"
              w="clamp(1.5rem, 2.5vw, 2.5rem)"
              h="clamp(1.5rem, 2.5vw, 2.5rem)"
            />
            <Heading
              as="h1"
              fontSize="clamp(1.2rem, 1.8vw, 2rem)"
              color="default.500"
              textAlign="center"
            >
              CBAAC
            </Heading>
          </HStack>
          <Heading
            as="h1"
            fontSize="clamp(1.5rem, 2.6vw, 3rem)"
            color="default.500"
            textAlign="center"
            my="4"
          >
            Admin Login
          </Heading>

          <Stack gap="4" w="full" as="form" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="primary" isLoading={isLoading}>
              Login
            </Button>
          </Stack>
        </VStack>
      </Center>
    </Flex>
  );
};

export default AdminLogin;
