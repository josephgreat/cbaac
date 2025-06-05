import {
  Box,
  Heading,
  Text,
  Skeleton,
  VStack,
  HStack,
  Icon,
  Flex,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient, { formatDate } from "../../utils/apiUtil";
import { FaUser } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import {
  HiOutlineCalendar,
  HiOutlineGlobeAlt,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi2";

const RegisteredUserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const toast = useToast();

  const fetchUserDetail = async () => {
    try {
      const response = await apiClient.get(`/registration/${id}/`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast({
        title: "Error fetching user details.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  return (
    <Box>
      <Heading fontSize={"clamp(1.7rem, 2vw, 2.2rem)"} mb="4">
        User Details
      </Heading>
      {user ? (
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap="8">
          <HStack gap="4">
            <Icon fontSize="2rem" as={HiOutlineUser} />{" "}
            <VStack alignItems={"flex-start"} gap="0">
              <Text fontWeight={500} fontSize={".85rem"}>
                Name:
              </Text>{" "}
              <Text fontSize={"1.2rem"}>{user.name}</Text>
            </VStack>
          </HStack>
          <HStack gap="4">
            <Icon fontSize="2rem" as={HiOutlineMail} />{" "}
            <VStack alignItems={"flex-start"} gap="0">
              <Text fontWeight={500} fontSize={".85rem"}>
                Email:
              </Text>{" "}
              <Text fontSize={"1.2rem"}>{user.email}</Text>
            </VStack>
          </HStack>
          <HStack gap="4">
            <Icon fontSize="2rem" as={HiOutlinePhone} />{" "}
            <VStack alignItems={"flex-start"} gap="0">
              <Text fontWeight={500} fontSize={".85rem"}>
                Phone Number:
              </Text>{" "}
              <Text fontSize={"1.2rem"}>{user.phone_number}</Text>
            </VStack>
          </HStack>
          <HStack gap="4">
            <Icon fontSize="2rem" as={HiOutlineLocationMarker} />{" "}
            <VStack alignItems={"flex-start"} gap="0">
              <Text fontWeight={500} fontSize={".85rem"}>
                Country:
              </Text>{" "}
              <Text fontSize={"1.2rem"}>{user.country}</Text>
            </VStack>
          </HStack>
          <HStack gap="4">
            <Icon fontSize="2rem" as={HiOutlineGlobeAlt} />{" "}
            <VStack alignItems={"flex-start"} gap="0">
              <Text fontWeight={500} fontSize={".85rem"}>
                Attendance Choices:
              </Text>{" "}
              <Text fontSize={"1.2rem"}>{user.attendance_choices}</Text>
            </VStack>
          </HStack>
          <HStack gap="4">
            <Icon fontSize="2rem" as={HiOutlineCalendar} />{" "}
            <VStack alignItems={"flex-start"} gap="0">
              <Text fontWeight={500} fontSize={".85rem"}>
                Registration Date:
              </Text>{" "}
              <Text fontSize={"1.2rem"}>
                {formatDate(user.registration_date)}
              </Text>
            </VStack>
          </HStack>
        </Grid>
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap="4">
          <Box>
            <strong>Name:</strong> <Skeleton height="20px" />
          </Box>
          <Box>
            <strong>Email:</strong> <Skeleton height="20px" />
          </Box>
          <Box>
            <strong>Phone Number:</strong> <Skeleton height="20px" />
          </Box>
          <Box>
            <strong>Country:</strong> <Skeleton height="20px" />
          </Box>
          <Box>
            <strong>Attendance Choices:</strong> <Skeleton height="20px" />
          </Box>
          <Box>
            <strong>Registration Date:</strong> <Skeleton height="20px" />
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default RegisteredUserDetail;
