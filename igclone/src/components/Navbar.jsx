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
  Textarea,
  Center,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import { RiAddBoxLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/api";

export default function Navbar() {
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const toast = useToast();
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [imgUrl, setImgUrl] = useState();

  const [post, setPost] = useState({
    caption: "",
  });

  function inputHandler(e) {
    const { value, id } = e.target;
    const tempCap = {};
    tempCap[id] = value;
    setPost({ ...tempCap });
    console.log(post);
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function posting() {
    const formData = new FormData();
    formData.append("Post", selectedFile);
    formData.append("caption", post.caption);
    formData.append("user_id", userSelector.id);
    console.log(selectedFile);
    if (selectedFile) {
      // console.log("masuk");
      return await api.post("/post", formData).then(() => {
        toast({
          position: "top",
          title: "post",
          description: "Your posting is successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
    }
    toast({
      position: "top",
      colorScheme: "red",
      title: "Posting",
      description: "Posting failed",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    setPost({ caption: "" });
    setSelectedFile("");
    onClose();
    nav("/home");
  }

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
              <Flex
                flexDir={"column"}
                gap={"16px"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"400px"}
              >
                <Flex
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDir={"column"}
                >
                  <Image
                    onClick={() => setSelectedFile(0)}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    padding={"16px"}
                    gap={"16px"}
                    minW={"50%"}
                    maxW={"100%"}
                    minH={"150px"}
                    // maxH={"100%"}
                    border={"1px dashed rgba(53, 53, 53, 0.3);"}
                    borderRadius={"8px"}
                    flex={"none"}
                    flexGrow={"0"}
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    fontStyle={"normal"}
                    fontWeight={"400"}
                    fontSize={"12px"}
                    lineHeight={"14px"}
                    bgColor={"gray.100"}
                    color={"#353535"}
                    src={imgUrl}
                  ></Image>
                  <Input
                    w={"50%"}
                    bgColor={"gray.100"}
                    // h={"200px"}
                    type={"file"}
                    accept="image/png, image/jpeg"
                    ref={inputFileRef}
                    // display={"none"}
                    id="filename"
                    onChange={(e) => {
                      handleFile(e);
                    }}
                  ></Input>
                </Flex>
                <Flex w={"100%"}>
                  <Textarea
                    w={"100%"}
                    minH={"50px"}
                    placeholder="write your caption"
                    id="caption"
                    onChange={inputHandler}
                  ></Textarea>
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="ghost" onClick={posting}>
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <Avatar
        src={userSelector.avatar_url}
        onClick={() => nav("/profile")}
        border={userSelector.verified ? null : "4px solid red"}
      ></Avatar>
    </Box>
  );
}
