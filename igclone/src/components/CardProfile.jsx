import { Avatar, Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineModeComment } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { SlOptions } from "react-icons/sl";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

export default function CardProfile() {
  return (
    <Box width={"100%"}>
      <img
        src="https://sgp1.digitaloceanspaces.com/tz-mag-id/wp-content/uploads/2022/08/111108083434/Wisata-Instagramable-Kuala-Lumpur-Malaysia-KL-Tower-Skybox.jpg"
        alt=""
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        }}
      />
    </Box>
  );
}
