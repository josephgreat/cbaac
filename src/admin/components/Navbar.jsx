import { Box, Heading, HStack, Img, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { HiMenu } from "react-icons/hi";

const Navbar = ({ toggleSidebar }) => {
  const showToggleIcon = useBreakpointValue({ base: true, md: false });

  // Determine the greeting based on the current hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <HStack as="nav" w="100%" py={{base: "8", md: "10"}} px={{ base: "4", md: "8" }} bg="white">
      {showToggleIcon && (
        <IconButton
          icon={<HiMenu />}
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          variant="outline"
          colorScheme="gray"
        />
      )}
      <Heading as="h2" fontSize="clamp(1rem, 1.5vw, 2rem)">
        Hi, {getGreeting()}
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
