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
import { useNavigate } from "react-router-dom";
import DynamicAlert from "../../../components/DynamicAlert";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    description: "",
    status: "",
  });
  const navigate = useNavigate();

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
      const { access, refresh } = response.data;
      Cookies.set("cbaac_admin_2025_conference_access_token", access, {
        expires: 1,
      });
      Cookies.set("cbaac_admin_2025_conference_refresh_token", refresh, {
        expires: 7,
      });
      navigate("/admin/registered-users");
    } catch (error) {
      if (error.response?.status === 401) {
        setAlert({
          isOpen: true,
          title: "Login Failed",
          description: "Wrong username or password. Please try again.",
          status: "error",
        });
      } else {
        setAlert({
          isOpen: true,
          title: "Login Failed",
          description: `Error: ${error.message}`,
          status: "error",
        });
      }
    } finally {
      setIsLoading(false);
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
          filter={{ base: " brightness(.8)", md: "unset" }}
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
              src="/images/cbaac_logo.png"
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

          <Stack gap="4" w="full" as="form">
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
            <Button
              type="submit"
              colorScheme="primary"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Stack>
        </VStack>
      </Center>
      <DynamicAlert
        isOpen={alert.isOpen}
        description={alert.description}
        title={alert.title}
        status={alert.status}
        onClose={() =>
          setAlert({ isOpen: false, title: "", description: "", status: "" })
        }
      />
    </Flex>
  );
};

export default AdminLogin;
