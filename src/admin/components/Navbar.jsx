import { Box, Heading, HStack, Img, IconButton } from "@chakra-ui/react";
import React from "react";
import { HiMenu } from "react-icons/hi";

const Navbar = ({ toggleSidebar }) => {
  return (
    <HStack as="nav" w="100%" p="8" bg="white">
      <IconButton
        icon={<HiMenu />}
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        variant="outline"
        colorScheme="gray"
      />
      <Heading as="h2" fontSize="clamp(1rem, 1.5vw, 2rem)">
        Hi,
      </Heading>
      <HStack ml="auto">
        <Img
          src="/images/cbaac_logo.png"
          alt="CBAAC Logo"
          w="clamp(1rem, 2vw, 2rem)"
          h="clamp(1rem, 2vw, 2rem)"
        />
        <Heading
          as="h3"
          fontSize="clamp(1rem, 1.5vw, 2rem)"
          color="default.500"
          textAlign="center"
        >
          Admin
        </Heading>
      </HStack>
    </HStack>
  );
};

export default Navbar;
