import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Heading,
  Text,
  Icon,
  CloseButton,
} from "@chakra-ui/react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const DynamicAlert = ({ isOpen, onClose, status, title, description }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay />
      <ModalContent  maxW={"90vw"} w="fit-content">
        <ModalHeader display="flex">
          <CloseButton onClick={onClose} border={"0"} outline={"0"} ml="auto" />
        </ModalHeader>
        <ModalBody>
          <VStack status={status} variant="subtle" borderRadius="md" pb="8">
            <Icon
              as={status === "success" ? FaCheckCircle : FaExclamationCircle}
              color={status === "success" ? "primary.500" : "red.500"}
              fontSize={"5rem"}
              mb="4"
            />
            <Heading as="h4" textAlign={"center"} fontSize={"clamp(1.2rem, 1.8vw, 2.5rem)"}>{title}</Heading>
            <Text textAlign={"center"}>{description}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DynamicAlert;
