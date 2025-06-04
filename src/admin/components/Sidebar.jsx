import {
  Divider,
  Heading,
  HStack,
  Img,
  Link,
  Text,
  VStack,
  CloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiOutlineLogout, HiOutlineMail } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import DynamicAlert from "../../components/DynamicAlert";

const Sidebar = ({ isVisible, toggleSidebar }) => {
  const showCloseButton = useBreakpointValue({ base: true, md: false });
  const [showDynamicAlert, setShowDynamicAlert] = useState({
    show: false,
    status: "",
    title: "",
    description: "",
  });
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://cbaac.onrender.com/api/admin/logout/"
        // {
        //   "refresh": refreshToken,
        // }
      );


      if (response.status === 205) {
        setShowDynamicAlert({
          show: true,
          status: "success",
          title: "Logout Successful",
          description: "You have been logged out successfully.",
        });
        Cookies.remove("cbaac_admin_2025_conference_access_token");
        Cookies.remove("cbaac_admin_2025_conference_refresh_token");
        window.location.href = "/admin/";
      } else {
        setShowDynamicAlert({
          show: true,
          title: "Logout failed",
          description: `${response.data.detail || "Unknown error"}`,
          status: "error",
        });
      }
    } catch (error) {
      setShowDynamicAlert({
        show: true,
        title: "Error",
        description: "An error occurred during logout.",
        status: "error",
      });
    }
  };

  return (
    <VStack
      minH="100vh"
      w="clamp(15rem, 15vw, 20rem)"
      bg="default.800"
      color="default.100"
      py={"8"}
      alignItems="flex-start"
      position="fixed"
      top="0"
      left={{ base: isVisible ? "0" : "-100%", md: "0" }}
      transition="left 0.3s ease-in-out"
      zIndex="2"
    >
      <DynamicAlert
        isOpen={showDynamicAlert.show}
        status={showDynamicAlert.status}
        title={showDynamicAlert.title}
        description={showDynamicAlert.description}
        onClose={() =>
          setShowDynamicAlert({
            show: false,
            status: "",
            title: "",
            description: "",
          })
        }
      />
      <HStack px="1rem" w="100%" alignItems="center">
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
        {showCloseButton && <CloseButton ml="auto" onClick={toggleSidebar} />}
      </HStack>
      <Divider borderColor={"default.400"} my={"8"} />
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
          onClick={toggleSidebar}
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
          onClick={toggleSidebar}
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
      <Divider borderColor={"default.400"} my={"8"} mt="auto" />
      <Link
        display="flex"
        alignItems="center"
        gap="2"
        _activeLink={{ bg: "default.200", color: "default.500" }}
        color={"red.200"}
        px="4"
        py="2"
        w="100%"
        onClick={handleLogout}
        _hover={{
          textDecor: "unset",
          color: "red.200",
          bg: "red.500",
        }}
      >
        <HiOutlineLogout />
        <Text>Logout</Text>
      </Link>
    </VStack>
  );
};

export default Sidebar;
