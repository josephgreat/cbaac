import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Select,
  useToast,
  FormHelperText,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { states } from "../../../assets/state";
import axios from "axios";
import DynamicAlert from "../../../components/DynamicAlert";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    state: "",
    phone_number: "",
    attendance_choices: "In-person",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showDynamicAlert, setShowDynamicAlert] = useState({
    show: false,
    status: "",
    title: "",
    description: "",
  });

  const validateForm = () => {
    const errors = {};
    errors.first_name = !formData.first_name.trim()
      ? "First name is required."
      : "";
    errors.last_name = !formData.last_name.trim()
      ? "Last name is required."
      : "";
    errors.email =
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Valid email is required."
        : "";
    errors.state = !formData.state.trim() ? "State is required." : "";
    errors.phone_number =
      !formData.phone_number.trim() ||
      !/^((\+234)|0)?\d{10}$/.test(formData.phone_number)
        ? "Valid phone number is required."
        : "";
    return errors;
  };
  const getFirstKey = (data) => {
    return Object.keys(data)[0];
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    const formattedPhoneNumber = formData.phone_number.startsWith("0")
      ? `+234${formData.phone_number.slice(1)}`
      : formData.phone_number;

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/registration/`,
        {
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          state: formData.state,
          phone_number: formattedPhoneNumber,
          attendance_choices: formData.attendance_choices,
        }
      );
      setShowDynamicAlert({
        show: true,
        status: "success",
        title: "Registration Successful",
        description: "You have successfully registered for the conference.",
      }); // Ensure this is triggered after a successful response
    } catch (error) {
      setShowDynamicAlert({
        show: true,
        status: "error",
        title: "Registration Failed",
        description:
          error.response?.data[getFirstKey(error.response?.data)] ||
          "An error occurred during registration.",
      }); // Ensure this is triggered after a successful response
    } finally {
      setIsLoading(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        state: "",
        phone_number: "",
        attendance_choices: "In-person",
      });
    }
  };

  const handleChange = (e) => {
    if (typeof e === "string") {
      // Handle RadioGroup changes
      setFormData((prevData) => ({
        ...prevData,
        attendance_choices: e,
      }));
    } else {
      // Handle other input changes
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Example usage:
  const firstKey = getFirstKey(formData);

  return (
    <Box>
      <DynamicAlert
        isOpen={showDynamicAlert.show} // Ensure `isOpen` is correctly passed
        status={showDynamicAlert.status}
        title={showDynamicAlert.title}
        description={showDynamicAlert.description}
        onClose={() => {
          setShowDynamicAlert({
            show: false,
            status: "",
            title: "",
            description: "",
          });
        }}
      />

      <Stack spacing={4}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap="4"
          alignItems="center"
        >
          <FormControl
            id="first-name"
            isRequired
            isInvalid={formErrors.first_name}
          >
            <FormLabel fontSize="clamp(.65rem, 1vw, 1rem)">
              First Name
            </FormLabel>
            <Input
              name="first_name"
              placeholder="Enter First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
            {formErrors.first_name && (
              <FormHelperText>{formErrors.first_name}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            id="last-name"
            isRequired
            isInvalid={formErrors.last_name}
          >
            <FormLabel fontSize="clamp(.65rem, 1vw, 1rem)">Last Name</FormLabel>
            <Input
              name="last_name"
              placeholder="Enter Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
            {formErrors.last_name && (
              <FormHelperText>{formErrors.last_name}</FormHelperText>
            )}
          </FormControl>
        </Flex>
        <FormControl id="email" isRequired isInvalid={formErrors.email}>
          <FormLabel fontSize="clamp(.65rem, 1vw, 1rem)">Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <FormHelperText>{formErrors.email}</FormHelperText>
          )}
        </FormControl>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap="4"
          alignItems="center"
        >
          <FormControl id="state" isRequired isInvalid={formErrors.state}>
            <FormLabel fontSize="clamp(.65rem, 1vw, 1rem)">State</FormLabel>
            <Select
              placeholder="Select State"
              value={formData.state}
              onChange={handleChange}
              name="state"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
            {formErrors.state && (
              <FormHelperText>{formErrors.state}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            id="phone-number"
            isInvalid={formErrors.phone_number}
            isRequired
          >
            <FormLabel fontSize="clamp(.65rem, 1vw, 1rem)">
              Phone number
            </FormLabel>
            <Input
              placeholder="Enter Phone number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              name="phone_number"
            />
            {formErrors.phone_number && (
              <FormHelperText>{formErrors.phone_number}</FormHelperText>
            )}
          </FormControl>
        </Flex>
        <FormControl id="mode-of-attendance" isRequired>
          <FormLabel fontSize="clamp(.65rem, 1vw, 1rem)">
            Mode of Attendance
          </FormLabel>
          <RadioGroup
            colorScheme="primary"
            name="attendance_choices"
            onChange={handleChange}
            value={formData.attendance_choices}
          >
            <HStack spacing="24px">
              <Radio value="Virtual" name="attendance_choices">
                Online
              </Radio>
              <Radio value="In-person" name="attendance_choices">
                In-Person
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button
          bg="primary.500"
          color="white"
          type="submit"
          my="4"
          onClick={handleSubmit}
          isLoading={isLoading}
          outline={0}
        >
          Register
        </Button>
        <Link href="https://cbaac.gov.ng/" target="_blank" mx="auto">
          Visit our website
        </Link>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;
