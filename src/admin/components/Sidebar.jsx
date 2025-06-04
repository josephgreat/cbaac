import {
  Divider,
  Heading,
  HStack,
  Img,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <VStack
      minH="100vh"
      w="clamp(10rem, 15vw, 15rem)"
      bg="default.800"
      color="default.100"
      py="6"
      alignItems="flex-start"
      position="fixed"
      top="0"
      left="0"
    >
      <HStack px="1rem">
        <Img
          src="/images/cbaac_logo.png"
          alt="CBAAC Logo"
          w="clamp(1.5rem, 2.5vw, 2.5rem)"
          h="clamp(1.5rem, 2.5vw, 2.5rem)"
        />
        <Heading
          as="h1"
          fontSize="clamp(1.2rem, 1.8vw, 2rem)"
          color="default.100"
          textAlign="center"
        >
          CBAAC
        </Heading>
      </HStack>
      <Divider borderColor={"default.300"} my={{ base: "4", md: "6" }} />
      <VStack alignItems="flex-start" my="1rem" gap="8" p="0" w="100%">
        <Link
          as={NavLink}
          to="/admin/registered-users"
          display="flex"
          alignItems="center"
          gap="2"
          _activeLink={{ bg: "default.200", color: "default.500" }}
          color={"default.200"}
          px="4"
          py="2"
          w="100%"
          _hover={{
            textDecor: "unset",
            color: "default.200",
            bg: "default.500",
          }}
        >
          <HiOutlineUsers />
          <Text>Registered Users</Text>
        </Link>
        <Link
          as={NavLink}
          to="/admin/send-mail"
          display="flex"
          alignItems="center"
          gap="2"
          _activeLink={{ bg: "default.200", color: "default.500" }}
          color={"default.200"}
          px="4"
          py="2"
          w="100%"
          _hover={{
            textDecor: "unset",
            color: "default.200",
            bg: "default.500",
          }}
        >
          <HiOutlineMail />
          <Text>Send Mail</Text>
        </Link>
      </VStack>
    </VStack>
  );
};

export default Sidebar;
