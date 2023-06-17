import { Flex } from "@chakra-ui/react";
import CardPost from "../components/CardPost";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

export default function HomePage() {
  return (
    <>
      <Flex flexDir={"column"} gap={"16px"}>
        <TopBar></TopBar>
        <CardPost />
        <CardPost />
        <CardPost />
      </Flex>
      <Navbar></Navbar>
    </>
  );
}
