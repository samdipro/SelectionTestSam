import { Avatar, Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { SlOptions } from "react-icons/sl";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { useSelector } from "react-redux";

export default function CardPost() {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <Container maxW={"400px"}>
        <Box>
          <Flex
            justifyContent={"space-between"}
            padding={"6px"}
            alignItems={"center"}
          >
            <Avatar
              src={userSelector.avatar_url}
              width={"32px"}
              height={"32px"}
            ></Avatar>
            <Box width={"70%"}>Name</Box>
            <Box>
              <Icon _hover={{ cursor: "pointer" }} as={SlOptions}></Icon>
            </Box>
          </Flex>
          <Box
            maxW={"468px"}
            // maxH={"303px"}
            minW={"300px"}
            // minH={"300px"}
          >
            <img
              src="https://www.adweek.com/wp-content/uploads/files/head_3.png"
              alt=""
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
              }}
            />
          </Box>
          <Flex justifyContent={"space-between"} fontSize={"xl"}>
            <Flex
              width={"20%"}
              justifyContent={"space-evenly"}
              align={"center"}
            >
              <Icon
                _hover={{ cursor: "pointer" }}
                // as={AiFillHeart}
                // color={"red"}
                as={AiOutlineHeart}
              ></Icon>
              <Icon _hover={{ cursor: "pointer" }} as={BsChat}></Icon>
              <Icon _hover={{ cursor: "pointer" }} as={TbSend}></Icon>
            </Flex>
            <Box>
              <Icon
                _hover={{ cursor: "pointer" }}
                as={RxBookmark}
                // as={RxBookmarkFilled}
              ></Icon>
            </Box>
          </Flex>
          <Text>Count Like</Text>
          <Flex>caption</Flex>
          <Flex>comment</Flex>
        </Box>
      </Container>
    </>
  );
}
