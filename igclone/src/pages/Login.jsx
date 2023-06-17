import {
  Box,
  Container,
  Image,
  Center,
  Flex,
  Input,
  Icon,
  Button,
  Divider,
  AbsoluteCenter,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import logo from "../assets/ui/logo-text.svg";
import googleplay from "../assets/ui/googleplay.png";
import msstore from "../assets/ui/msstore.png";
import {
  AiFillFacebook,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { api } from "../api/api";

export default function LoginPage() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const [user, setUser] = useState({
    emun: "",
    password: "",
  });

  function inputHandler(e) {
    const { value, id } = e.target;
    const tempAccount = { ...user };
    tempAccount[id] = value;
    setUser(tempAccount);
  }

  async function login() {
    const result = await api.get("/user/login", {
      params: user,
    });
    alert(result.data.message);
    const token = result.data.token;
    localStorage.setItem("token", token);

    const result2 = await api.get("/user/gbt", {
      params: {
        token: token,
      },
    });
    return dispatch({
      type: "login",
      payload: result2.data,
    });
  }
  return (
    <Box
      bgColor={"#f8f9f9"}
      display="flex"
      justifyContent="center"
      // alignItems="center"
    >
      <Container
        maxWidth={"400px"}
        width={"100%"}
        height={"100vh"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        // border={"1px solid grey"}
      >
        <Flex
          width={"100%"}
          //  height={"100vh"}
          flexDir={"column"}
          maxW={"350px"}
          h={"400px"}
          alignItems={"center"}
          justifyContent={"space-evenly "}
          border={"1px solid grey"}
        >
          <Box>
            <Image w={"175px"} h={"51px"} src={logo} />
          </Box>
          <Flex
            flexDir={"column"}
            w={"350px"}
            h={"270px"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Flex flexDir={"column"} gap={"6px"}>
              <Input
                h={"35px"}
                w={"260px"}
                type="text"
                fontSize={"sm"}
                placeholder="Username or email"
                id="emun"
                onChange={inputHandler}
              ></Input>
              <InputGroup>
                <Input
                  h={"35px"}
                  w={"260px"}
                  // type="text"
                  type={seePassword ? "text" : "password"}
                  fontSize={"sm"}
                  placeholder="Password"
                  id="password"
                  onChange={inputHandler}
                ></Input>
                <InputRightElement h={"100%"}>
                  <Icon
                    as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                    color={"#a5a5a5"}
                    w={"24px"}
                    h={"24px"}
                    cursor={"pointer"}
                    onClick={() => setSeePassword(!seePassword)}
                  ></Icon>
                </InputRightElement>
              </InputGroup>
            </Flex>
            <Button
              bgColor={"#0095f6"}
              w={"269px"}
              h={"32px"}
              borderRadius={"8px"}
              border={"none"}
              color={"#ffff"}
              cursor={"pointer"}
              _hover={{ bgColor: "#1877f2" }}
              fontWeight={"bold"}
              onClick={login}
            >
              Log in
            </Button>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter px="4">OR</AbsoluteCenter>
            </Box>
            <Flex alignItems={"center"}>
              <Icon color={"#385185"} as={AiFillFacebook}></Icon>
              <Box>Login with Facebook</Box>
            </Flex>
            <Box>
              <Center cursor={"pointer"} onClick={() => nav("/forget")}>
                Forget Password?
              </Center>
            </Box>
          </Flex>
        </Flex>
        <Flex
          justifyContent={"center"}
          // border={"1px solid grey"}
          w={"100%"}
          h={"40px"}
          alignItems={"center"}
        >
          Don't have an account?{" "}
          <span
            onClick={() => nav("/register")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign up
          </span>
        </Flex>
        <Flex flexDir={"column"} alignItems={"center"} gap={"8px"}>
          <Box>Get the app.</Box>
          <Flex gap={"8px"}>
            <Box height={"40px"}>
              <Image h={"100%"} w={"100%"} src={googleplay} />
            </Box>
            <Box height={"40px"}>
              <Image h={"100%"} w={"100%"} src={msstore} />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
