import { Center, Flex, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Center flexDir={"column"}>
      <Flex gap="2" alignItems={"center"}>
        <Img
          src="images/cbaac_logo.png"
          alt="CBAAC Logo"
          w="clamp(2rem, 3vw, 3.5rem)"
          h="clamp(2rem, 3vw, 3.5rem)"
        />
        <Heading
          as="h1"
          fontSize="clamp(1.5rem, 2.6vw, 3rem)"
          color="default.500"
        >
          CBAAC
        </Heading>
      </Flex>
      <Text
        fontSize="clamp(.65rem, 1vw, 1rem)"
        color="default.500"
        fontWeight={500}
        marginTop="1rem"
        textAlign={"center"}
      >
        Centre for Black and African Arts and Civilization (CBAAC)
      </Text>
    </Center>
  );
};

export default Header;
