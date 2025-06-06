import {
  Box,
  Button,
  Heading,
  Input,
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
  useToast,
  Flex,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { CSVLink } from "react-csv";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceFilter, setAttendanceFilter] = useState("");
  const [isCsvLoading, setIsCsvLoading] = useState(false);

  const usersPerPage = 15;
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAttendance = attendanceFilter
      ? user.attendance_choices === attendanceFilter
      : true;
    return matchesSearch && matchesAttendance;
  });
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const virtualCount = users.filter(
    (user) => user.attendance_choices === "Virtual"
  ).length;
  const inPersonCount = users.filter(
    (user) => user.attendance_choices === "In-person"
  ).length;

  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = Cookies.get(
          "cbaac_admin_2025_conference_access_token"
        );
        if (!accessToken) {
          window.location.href = "/admin";
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/registration/`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching registered users:", error);
        toast({
          title: "Error fetching registered users.",
          description: "Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAttendanceFilterChange = (e) => {
    setAttendanceFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCsvDownload = () => {
    setIsCsvLoading(true);
    setTimeout(() => {
      setIsCsvLoading(false);
    }, 1000); // Simulate download completion
  };

  return (
    <Box>
      <Flex
        flexWrap={"wrap"}
        justifyContent="space-between"
        alignItems="center"
        mb="4"
      >
        <Heading fontSize={"clamp(1.7rem, 2vw, 2.2rem)"} mb="4">
          Registered Users {users.length > 0 && `(${users.length})`}
        </Heading>
        <Flex gap="2" flexWrap="wrap">
          <InputGroup w="min(20rem, 100%)">
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              mb="4"
            />
          </InputGroup>
          <Select
            placeholder="Filter by attendance"
            value={attendanceFilter}
            onChange={handleAttendanceFilterChange}
            w="min(8rem, 100%)"
          >
            <option value="Virtual">Virtual</option>
            <option value="In-person">In-person</option>
          </Select>
          <Button
            colorScheme="primary"
            isLoading={isCsvLoading}
            onClick={handleCsvDownload}
          >
            <CSVLink
              data={users}
              filename="registered_users.csv"
              style={{ textDecoration: "none", color: "white" }}
              onClick={handleCsvDownload}
            >
              Download CSV
            </CSVLink>
          </Button>
        </Flex>
      </Flex>
      <Text mb="4">
        Virtual: {virtualCount} | In-person: {inPersonCount}
      </Text>
      <TableContainer
        maxW={{ base: "calc(100vw - 4rem)", md: "calc(100vw - 20rem)" }}
        overflow={"auto"}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Attendance Choices</Th>
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
              {displayedUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.phone_number}</Td>
                  <Td>{user.attendance_choices}</Td>
                  <Td textAlign={"center"}>
                    <Link
                      as={RouteLink}
                      to={`/admin/registered-users/${user.id}`}
                      display="flex"
                      justifyContent="center"
                      color="default.500"
                      _hover={{ color: "default.300" }}
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
      <Flex justifyContent="center" mt="4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            colorScheme={currentPage === index + 1 ? "primary" : "gray"}
            mx="1"
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default RegisteredUsers;
