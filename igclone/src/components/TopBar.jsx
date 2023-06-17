import { Box, Image } from "@chakra-ui/react";
import logo from "../assets/ui/logo-text.svg";

export default function TopBar() {
  return (
    <>
      <Box
        bgColor={"#ffff"}
        width={"100%"}
        height={"48px"}
        top={"0"}
        position={"sticky"}
        display={"flex"}
        justifyContent={"space-evenly"}
        padding={" 3px 0"}
      >
        <Image w={"175px"} h={"51px"} src={logo} />
      </Box>
    </>
  );
}
