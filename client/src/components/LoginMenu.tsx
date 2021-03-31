import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  MenuGroup,
  Switch,
  useColorMode,
  Box,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { FaUser, FaMoon, FaUserPlus } from "react-icons/fa";
import DarkMenuItem from "./DarkMenuItem";

export const LoginMenu = () => {
  const router = useRouter();

  const [{ data, fetching }] = useMeQuery();
  const [dark, setdark] = useState();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  return (
    <Flex>
      <Box>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Login / Register
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<Icon as={FaUser} />}
              onClick={() => router.push("/login")}
            >
              Login
            </MenuItem>
            <MenuItem
              icon={<Icon as={FaUserPlus} />}
              onClick={() => router.push("/register")}
            >
              Register
            </MenuItem>
            <MenuGroup title="View Options"></MenuGroup>
            <DarkMenuItem />
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
