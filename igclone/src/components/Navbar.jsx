import {
  Avatar,
  Box,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Input,
} from "@chakra-ui/react";
import { RiAddBoxLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const [post, setPost] = useState({
    caption: "",
  });
  return (
    <Box
      bgColor={"#ffff"}
      width={"100%"}
      height={"48px"}
      bottom={"0"}
      position={"fixed"}
      display={"flex"}
      justifyContent={"space-evenly"}
      padding={" 3px 0"}
    >
      <Icon
        onClick={() => nav("/home")}
        fontSize={"4xl"}
        height={"100%"}
        as={AiFillHome}
      ></Icon>
      <Icon
        fontSize={"4xl"}
        height={"100%"}
        as={RiAddBoxLine}
        onClick={onOpen}
      ></Icon>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Flex flexDir={"column"}>
                <Input type={"image"}></Input>
                <Input placeholder="caption"></Input>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="ghost">Post</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Avatar
        src={userSelector.avatar_url}
        onClick={() => nav("/profile")}
      ></Avatar>
    </Box>
  );
}
