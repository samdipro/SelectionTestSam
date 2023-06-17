import { Flex } from "@chakra-ui/react";
import CardPost from "../components/CardPost";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import { api } from "../api/api";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [post, setPost] = useState([]);
  async function getPost() {
    await api.get("/post/getpost").then((res) => {
      setPost(res.data);
    });
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Flex flexDir={"column"} gap={"16px"}>
        <TopBar></TopBar>
        {post.length
          ? post.map((val) => {
              return <CardPost val={val} />;
            })
          : null}
      </Flex>
      <Navbar></Navbar>
    </>
  );
}
