import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import apiClient from "../../utils/apiUtil";
import DynamicAlert from "../../../components/DynamicAlert";

const SendMail = () => {
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showDynamicAlert, setShowDynamicAlert] = useState({
    show: false,
    status: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response = await apiClient.post("/admin/send-email/", formData);
      setShowDynamicAlert({
        show: true,
        title: "Success",
        description: "Email sent successfully!",
        status: "success",
      });
      setFormData({ subject: "", message: "" });
    } catch (error) {
      setShowDynamicAlert({
        show: true,
        title: "Error",
        description: "Failed to send email.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="min(90vw, 40rem)">
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
      <Heading fontSize={"clamp(1.7rem, 2vw, 2.2rem)"} mb="4">
        Send Mail
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4" w="100%" alignItems={"flex-start"}>
          <FormControl isRequired>
            <FormLabel>Subject</FormLabel>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter email subject"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter email content"
              rows={6}
            />
          </FormControl>
          <Button type="submit" colorScheme="primary" isLoading={isLoading}>
            Send Email
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SendMail;
