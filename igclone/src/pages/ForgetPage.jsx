import {
  Box,
  Container,
  Icon,
  Image,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { TfiLock } from "react-icons/tfi";
import logo from "../assets/ui/logo-text.svg";
import { useState } from "react";
import { api } from "../api/api";

export default function ForgetPage() {
  const [email, setEmail] = useState({
    email: "",
  });
  function inputHandler(e) {
    const { value, id } = e.target;
    const tempEmail = { ...email };
    tempEmail[id] = value;
    setEmail(tempEmail);
    console.log(email);
  }
  async function forget() {
    await api.get("/user/forget", {
      params: email,
    });
    alert("check your email, to reset the password");
  }
  return (
    <>
      <Container
        minW={"300px"}
        maxW={"400px"}
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
      >
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          height={"65%"}
          gap={"16px"}
        >
          <Box>
            <Image w={"175px"} h={"51px"} src={logo} />
          </Box>
          <Icon w={"140px"} h={"140px"} as={TfiLock}></Icon>
          <Box>Trouble logging in?</Box>
          <Box>
            Enter your email and we'll send you a link to get back into your
            account.
          </Box>
          <Box width={"100%"} padding={"0 16px"}>
            <Input
              type="email"
              placeholder="your registered email"
              id="email"
              onChange={inputHandler}
            />
          </Box>
          <Flex flexDir={"column"} gap={"8px"}>
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
              onClick={() => forget()}
            >
              Send login link
            </Button>
            <Box cursor={"pointer"} textAlign={"center"}>
              Can't reset your password?
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
