import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Input,
  useToast,
  FormControl,
} from "@chakra-ui/react";
import { BsGearWide, BsPersonAdd } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import Navbar from "../components/Navbar";
import CardProfile from "../components/CardProfile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector);
  const nav = useNavigate();
  const inputFileRef = useRef(null);
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const postModal = useDisclosure();

  const [profile, setProfile] = useState({
    // ...userSelector,
    username: "",
    name: "",
    bio: "",
  });
  function inputHandler(e) {
    const { value, id } = e.target;
    const tempProfile = { ...profile };
    tempProfile[id] = value;
    setProfile({ ...profile, ...tempProfile });
    console.log(profile);
  }

  const updateProfile = async () => {
    try {
      console.log(selectedFile);
      console.log(profile);
      const formData = new FormData();
      formData.append("Avatar", selectedFile);
      formData.append("name", profile.name);
      formData.append("username", profile.username);
      formData.append("bio", profile.bio);

      console.log(formData.get("name"));
      console.log(formData.get("username"));
      console.log(formData.get("bio"));
      console.log(formData.get("Avatar"));

      const res = await api.patch("/user/" + userSelector.id, formData);
      console.log(res.data);
      toast({
        position: "top",
        colorScheme:
          res.data == "username already been used" ||
          res.data.message == "No fields to update"
            ? "red"
            : "cyan",
        title: "Edit Profile",
        description:
          res.data == "username already been used" ||
          res.data.message == "No fields to update"
            ? res.data
            : "Edit Success",
        status:
          res.data == "username already been used" ||
          res.data.message == "No fields to update"
            ? "error"
            : "success",
        duration: 3000,
        isClosable: true,
      });

      dispatch({
        type: "login",
        payload: res.data,
      });

      setSelectedFile("");
      onClose();
      nav("/profile");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Response payload from the server
        console.log(error.response.status); // Status code of the response
        console.log(error.response.headers); // Response headers
      } else {
        console.log(error.message); // General error message
      }
    }
  };

  const handleFile = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [all, setAll] = useState([]);
  async function getPost() {
    await api
      .get("/post/getpost", {
        params: { id: userSelector.id },
      })
      .then((res) => {
        console.log(res.data);
        setAll(res.data);
      });
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Container maxW={"400px"} height={"100vh"}>
        <Flex flexDir={"column"} width={"100%"} height={"100%"}>
          <Flex
            height={"44px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Icon w={"24px"} h={"24px"} as={BsGearWide}></Icon>
            <Flex justifyContent={"center"} alignItems={"center"} width={"80%"}>
              <Text fontWeight={"semibold"}>{userSelector.username}</Text>

              <Menu>
                <MenuButton display={"flex"}>
                  <Icon
                    cursor={"pointer"}
                    w={"24px"}
                    h={"24px"}
                    as={MdKeyboardArrowDown}
                  ></Icon>
                </MenuButton>

                <MenuList>
                  <MenuItem
                    color={"red"}
                    onClick={() => {
                      localStorage.removeItem("token");
                      nav("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Icon fontSize={"4xl"} as={BsPersonAdd}></Icon>
          </Flex>
          <Flex padding={"16px"}>
            <Box display={"flex"} justifyContent={"center"} width={"30%"}>
              <Avatar
                width={"auto"}
                height={"77px"}
                src={userSelector.avatar_url}
              ></Avatar>
            </Box>
            <Flex flexDir={"column"} gap={"12px"} width={"70%"}>
              <Flex alignItems={"center"} gap={"12px"}>
                <Text fontSize={"18px"} fontWeight={"semibold"}>
                  {userSelector.username}
                </Text>
                <Icon w={"24px"} h={"24px"} as={BsGearWide}></Icon>
              </Flex>
              <Button onClick={onOpen} h={"32px"}>
                Edit profile
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                  <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <Flex flexDir={"column"} gap={"6px"}>
                        <Input
                          id="name"
                          placeholder="Full Name"
                          type={"text"}
                          onChange={inputHandler}
                          defaultValue={userSelector.name}
                        ></Input>
                        <Input
                          id="bio"
                          placeholder="Bio"
                          type="text"
                          onChange={inputHandler}
                          defaultValue={userSelector.bio}
                        ></Input>
                        <Input
                          id="username"
                          placeholder="username"
                          onChange={inputHandler}
                          defaultValue={userSelector.username}
                        ></Input>
                        <Input
                          accept="image/png, image/jpeg"
                          onChange={handleFile}
                          ref={inputFileRef}
                          type="file"
                          display="none"
                        />
                        <Flex padding={"8px 0"} flexDir={"column"}>
                          <Avatar
                            cursor={"pointer"}
                            src={image}
                            size={"xl"}
                            onClick={() => {
                              inputFileRef.current.click();
                            }}
                          />
                          <Text>clik the picture to change</Text>
                        </Flex>
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="yellow" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        // variant="ghost"
                        colorScheme="blue"
                        onClick={updateProfile}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </ModalOverlay>
              </Modal>
            </Flex>
          </Flex>
          <Center width={"100%"} padding={"0 16px 16px 16px"}>
            <Flex flexDir={"column"} width={"100%"}>
              <Text fontWeight={"bold"}>{userSelector.name}</Text>
              <Text>{userSelector.bio}</Text>
            </Flex>
          </Center>
          <Flex flexWrap={"wrap"} gap={"4px"}>
            {all.length
              ? all.map((val) => {
                  return (
                    <Box
                      width={"32%"}
                      onClick={() => {
                        postModal.onOpen();
                      }}
                    >
                      <CardProfile
                        isOpen={postModal.isOpen}
                        onClose={postModal.onClose}
                        val={val}
                      ></CardProfile>
                    </Box>
                  );
                })
              : null}
          </Flex>
        </Flex>
      </Container>
      <Navbar></Navbar>
    </>
  );
}
