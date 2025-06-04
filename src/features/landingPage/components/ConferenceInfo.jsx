import { Center, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi2";

const ConferenceInfo = () => {
  return (
    <Center flexDir={"column"} my="2.5rem" gap="4">
      <Heading
        as="h3"
        fontSize="clamp(.65rem, 1vw, 1rem)"
        color="default.500"
        fontWeight={600}
        textAlign={"center"}
      >
        ANNUAL INTERNATIONAL CONFERENCE
      </Heading>
      <Heading
        as="h2"
        fontSize="clamp(1em, 1.5vw, 2rem)"
        color="default.500"
        fontWeight={600}
        textAlign={"center"}
      >
        CULTURAL TOURISM, CREATIVE ECONOMY AND SUSTAINABLE DEVELOPMENT IN AFRICA
      </Heading>
      <Flex rowGap="2" columnGap={"4"} flexWrap={"wrap"} alignItems={"center"} justifyContent={{md: "center"}}>
        <HStack>
          <HiOutlineClock />
          <Text
            fontSize="clamp(.65rem, .85vw, 1rem)"
            fontWeight={400}
            color="default.500"
          >
            11:00 AM
          </Text>
        </HStack>
        <HStack>
          <HiOutlineCalendar />
          <Text
            fontSize="clamp(.65rem, .85vw, 1rem)"
            fontWeight={400}
            color="default.500"
          >
            Tuesday 10th - Wednesday 11th June, 2025
          </Text>
        </HStack>
      </Flex>
    </Center>
  );
};

export default ConferenceInfo;
