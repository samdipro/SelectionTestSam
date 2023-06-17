import {
  Box,
  Container,
  Image,
  Flex,
  Text,
  Input,
  Icon,
  Button,
  Divider,
  AbsoluteCenter,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/ui/logo-text.svg";
import googleplay from "../assets/ui/googleplay.png";
import msstore from "../assets/ui/msstore.png";
import { AiFillFacebook } from "react-icons/ai";
import { TbAlertCircleFilled } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { api } from "../api/api";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const nav = useNavigate();
  YupPassword(Yup);
  const toast = useToast();
  const [seePassword, setSeePassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("you need to enter your email.")
        .email("email is invalid - example@email.com"),

      password: Yup.string()
        .required("create your password")
        .min(8, "must contain >8 characters")
        .minLowercase(1, "must contain at least 1 lower case letter")
        .minUppercase(1, "must contain at least 1 upper case letter")
        .minNumbers(1, "must contain at least 1 number")
        .minSymbols(1, "must contain at least 1 special character"),
      name: Yup.string().required("Enter a name for your profile."),
      username: Yup.string().required("Enter the username for your profile."),
    }),
    onSubmit: async () => {
      try {
        const { email, name, username, password } = formik.values;
        const account = { email, name, username, password };

        const res = await api.post("/user/register", account).then((res) => {
          console.log(res);
        });

        toast({
          title: "Account created.",
          description:
            "We have successfully sent an email to initiate the verification process for your email address.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        nav("/login");
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  function inputHandler(e) {
    const { value, id } = e.target;
    formik.setFieldValue(id, value);
    // console.log(formik.values);
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
        border={"1px solid grey"}
      >
        <Flex
          width={"100%"}
          //  height={"100vh"}
          // maxHeight={"100%"}
          flexDir={"column"}
          maxW={"350px"}
          h={"400px"}
          alignItems={"center"}
          justifyContent={"space-evenly "}
          // border={"1px solid grey"}
        >
          <Box>
            <Image w={"175px"} h={"51px"} src={logo} />
          </Box>

          <Text textAlign={"center"}>
            Sign up to see photos and videos from your friends.
          </Text>

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
          >
            <Flex alignItems={"center"} gap={"6px"}>
              <Icon color={"#ffff"} as={AiFillFacebook}></Icon>
              <Box>log in with Facebook</Box>
            </Flex>
          </Button>

          <Box position="relative" padding="4">
            <Divider />
            <AbsoluteCenter px="4">OR</AbsoluteCenter>
          </Box>

          <Flex
            flexDir={"column"}
            w={"350px"}
            h={"auto"}
            justifyContent={"space-around"}
            alignItems={"center"}
            gap={"16px"}
          >
            <Flex flexDir={"column"} gap={"6px"}>
              <Input
                h={"35px"}
                w={"260px"}
                type="text"
                fontSize={"sm"}
                placeholder="Mobile Number or Email"
                id="email"
                onChange={inputHandler}
              ></Input>
              <Flex
                wrap={"wrap"}
                color={"red"}
                display={formik.errors.email ? "flex" : "none"}
                fontSize={"sm"}
                alignItems={"center"}
              >
                <Icon as={TbAlertCircleFilled} />
                {formik.errors.email}
              </Flex>

              <Input
                h={"35px"}
                w={"260px"}
                type="text"
                fontSize={"sm"}
                placeholder="Full Name"
                id="name"
                onChange={inputHandler}
              ></Input>
              <Flex
                wrap={"wrap"}
                color={"red"}
                display={formik.errors.name ? "flex" : "none"}
                fontSize={"sm"}
              >
                <Icon as={TbAlertCircleFilled} />
                {formik.errors.name}
              </Flex>

              <Input
                h={"35px"}
                w={"260px"}
                type="text"
                fontSize={"sm"}
                placeholder="username"
                id="username"
                onChange={inputHandler}
              ></Input>
              <Flex
                wrap={"wrap"}
                color={"red"}
                display={formik.errors.username ? "flex" : "none"}
                fontSize={"sm"}
              >
                <Icon as={TbAlertCircleFilled} />
                {formik.errors.username}
              </Flex>

              <InputGroup>
                <Input
                  h={"35px"}
                  w={"260px"}
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

              <Box width={"100%"} height={"auto"}>
                <Flex
                  wrap={"wrap"}
                  color={"red"}
                  display={formik.errors.password ? "flex" : "none"}
                  fontSize={"sm"}
                >
                  <Icon as={TbAlertCircleFilled} />
                  {formik.errors.password}
                </Flex>
              </Box>
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
              onClick={formik.handleSubmit}
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
        <Flex
          justifyContent={"center"}
          w={"100%"}
          h={"40px"}
          alignItems={"center"}
          marginTop={"32px"}
        >
          Have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => nav("/login")}
          >
            Log in
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
