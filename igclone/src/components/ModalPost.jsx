export default function ModalPost({ onClose, isOpen, val }) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Container maxW={"400px"}>
              <Box>
                <Flex
                  justifyContent={"space-between"}
                  padding={"6px"}
                  alignItems={"center"}
                >
                  <Avatar
                    src={props.val.User.avatar_url}
                    width={"32px"}
                    height={"32px"}
                  ></Avatar>
                  <Box width={"70%"}>{props.val.User.name}</Box>
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
                  <Image
                    src={props.val.Image}
                    width={"100%"}
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
                <Flex>{props.val.caption}</Flex>
                <Flex>comment</Flex>
              </Box>
            </Container>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
