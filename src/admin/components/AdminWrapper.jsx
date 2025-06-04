import { Box, Container, VStack, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminWrapper = ({ Component }) => {
  const isDefaultSidebarVisible = useBreakpointValue({ base: false, md: true });
  const [isSidebarVisible, setIsSidebarVisible] = useState(isDefaultSidebarVisible);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    setIsSidebarVisible(isDefaultSidebarVisible);
  }, [isDefaultSidebarVisible]);

  useEffect(() => {
    const accessToken = Cookies.get("cbaac_admin_2025_conference_access_token");
    if (!accessToken) {
      window.location.href = "/admin";
    }
  }, []);

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
        filter="blur(2px) brightness(0.5)"
        opacity="0.05"
        bgSize="cover"
        pos="fixed"
        inset="0"
      />
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <VStack
        pl={{
          // base: isSidebarVisible ? "clamp(15rem, 17vw, 20rem)" : "0",
          md: "clamp(15rem, 17vw, 20rem)",
        }}
        pos="relative"
        w="100%"
        alignItems="flex-start"
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <Box px={{ base: "4", md: "8" }} py="6" w="100%">
          <Component />
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminWrapper;
