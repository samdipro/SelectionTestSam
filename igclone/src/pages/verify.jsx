import { Container, Center, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useSelector } from "react-redux";

export default function Verify() {
  const nav = useNavigate();
  const { token } = useParams();
  console.log(token);
  useEffect(async () => {
    await api.get("/user/verify/" + token);
  }, []);

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
        <Flex flexDir={"column"}>
          <Center fontSize={"1rem"}>Your account is verified</Center>
          <Button colorScheme="green" onClick={() => nav("/home")}>
            Back to Home
          </Button>
        </Flex>
      </Container>
    </>
  );
}
