import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../utils/apiUtil";

const RegisteredUserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const fetchUserDetail = async () => {
    try {
      const response = await apiClient.get(`/registration/${id}/`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <Heading fontSize={"clamp(1.7rem, 2vw, 2.2rem)"} mb="4">
        User Details
      </Heading>
      <Text><strong>ID:</strong> {user.id}</Text>
      <Text><strong>Name:</strong> {user.name}</Text>
      <Text><strong>Email:</strong> {user.email}</Text>
      <Text><strong>Phone Number:</strong> {user.phone_number}</Text>
      <Text><strong>State:</strong> {user.state}</Text>
      <Text><strong>Attendance Choices:</strong> {user.attendance_choices}</Text>
      <Text><strong>Registration Date:</strong> {user.registration_date}</Text>
    </Box>
  );
};

export default RegisteredUserDetail;
