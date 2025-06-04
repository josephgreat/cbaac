import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
  SkeletonText,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = Cookies.get("access_token");
        // if (!accessToken) {
        //   window.location.href = "/admin";
        //   return;
        // }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/registration/`
          //   {
          //     headers: {
          //       Authorization: `Bearer ${accessToken}`,
          //     },
          //   }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching registered users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box>
      <Heading fontSize={"clamp(1.7rem, 2vw, 2.2rem)"} mb="4">
        Registered Users
      </Heading>
      <TableContainer maxW={"calc(100vw - 20rem)"} overflow={"auto"}>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>State</Th>
              <Th>Attendance Choices</Th>
              <Th>Registration Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {isLoading ? (
            <Tbody>
              {Array.from({ length: 4 }).map((_, index) => (
                <Tr key={index}>
                  <Td colSpan="8">
                    <Skeleton height="30px" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone_number}</Td>
                  <Td>{user.state}</Td>
                  <Td>{user.attendance_choices}</Td>
                  <Td>{user.registration_date}</Td>
                  <Td textAlign={"center"}>
                    <Link
                      as={RouteLink}
                      to={`/admin/registered-users/${user.id}`}
                      display="flex"
                      justifyContent="center"
                      color="default.500"
                     _hover={{color: "default.300"}}
                    >
                      <HiOutlineInformationCircle
                        color="blue.500"
                        cursor="pointer"
                      />
                    </Link>   
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RegisteredUsers;
