import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ConferenceInfo, Header, RegistrationForm } from "./components";

const LandingPage = () => {
  //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  return (
    <Container color="default.500" maxW="unset" padding="0">
      <Flex
        flexWrap={"wrap"}
        alignItems={{ base: "center" }}
        justifyContent={{ base: "center" }}
        pos="relative"
        minW={{ base: "100vw", lg: "unset" }}
        minH={{ base: "100vh", lg: "unset" }}
      >
        <Box
          w={{ lg: "50vw" }}
          //   h="100vh"
          pos={{ base: "fixed", lg: "relative" }}
          inset={{ base: "0", lg: "unset" }}
          minH={{ base: "100vh", lg: "100vh" }}
          bg="url('images/cbaac_flyer.jpg') no-repeat top center rgba(255,255,255,0.1)"
          bgSize={"cover"}
          filter={{ base: "blur(2px)", md: "unset" }}
        >
          {/* <Img
            src="images/cbaac_flyer.jpg"
            alt="CBAAC Flyer"
            h="100%"
            w="100%"
          /> */}
        </Box>
        <Box
          padding={"clamp(2rem, 5vw, 5rem)"}
          w={{ lg: "50%" }}
          maxW="85vw"
          maxH={{ base: "90vh", lg: "90vh" }}
          overflow={"auto"}
          bg={"white"}
          pos="relative"
          rounded={{ base: "lg", lg: "unset" }}
          shadow={{ base: "xl", lg: "unset" }}
        >
          <Header />
          <ConferenceInfo />
          <RegistrationForm />
        </Box>
      </Flex>
    </Container>
  );
};

export default LandingPage;
