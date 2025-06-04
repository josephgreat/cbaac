import { Box, Container, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminWrapper = ({ Component }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // useEffect(() => {
  //   const accessToken = Cookies.get("access_token");
  //   if (!accessToken) {
  //     window.location.href = "/admin";
  //   }
  // }, []);
  

  return (
    <Container
      maxW="unset"
      w="100vw"
      p="0"
      display="flex"
      minH="100vh"
      pos="relative"
    >
      <Box
        bg="url('/images/cbaac_flyer.jpg') no-repeat center"
        filter="blur(2px) brightness(0.3)"
        opacity="0.05"
        bgSize="cover"
        pos="fixed"
        inset="0"
      />
      <Sidebar isVisible={isSidebarVisible} />
      <VStack
        pl={isSidebarVisible ? "clamp(10rem, 15vw, 15rem)" : "0"}
        pos="relative"
        w="100%"
        alignItems="flex-start"
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <Box p="8" py="6">
          <Component />
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminWrapper;
