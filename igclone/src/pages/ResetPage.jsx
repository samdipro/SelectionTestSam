import {
  Box,
  Container,
  Icon,
  Image,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { TfiLock } from "react-icons/tfi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/ui/logo-text.svg";
import { useState } from "react";

export default function ResetPage() {
  const [seePassword, setSeePassword] = useState(false);
  return (
    <>
      <Container
        minW={"300px"}
        maxW={"400px"}
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
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
          <Box>Change Password</Box>
          <Box>Enter your new password</Box>
          <Box width={"100%"} padding={"0 16px"}>
            <InputGroup>
              <Input
                type={seePassword ? "text" : "password"}
                placeholder="your new password"
              />
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
            >
              Change Password
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
