import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUserSlash } from "react-icons/fa";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import DarkMenuItem from "./DarkMenuItem";
export const MenuBar = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [{ data, fetching }] = useMeQuery();
  const [dark, setdark] = useState();
  if (fetching) {
    <div> Loading....</div>;
  } else if (!data?.me) {
    <div>idk</div>
  }
  else {
   
  }
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const mode = useColorMode();
  let light: any = null;
  if (colorMode === "light") {
    light = false;
  } else {
    light = true;
  }
  return (

   
  );
};
