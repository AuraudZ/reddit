import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { FaUser, FaUserPlus, FaUserSlash } from "react-icons/fa";
import { Logo } from "../components/Logo";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import DarkMenuItem from "./DarkMenuItem";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
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
    // user is logged in
  } else {
    body = (
      <Flex>
        <Box>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {data!.me?.username}
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<AddIcon />}
                onClick={() => router.push("/create-post")}
              >
                Create Post
              </MenuItem>

              <MenuGroup title="View Options">
                <DarkMenuItem />
              </MenuGroup>
              <MenuGroup title="Logout">
                <MenuItem
                  isLoading={logoutFetching}
                  icon={<Icon as={FaUserSlash} />}
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      bgColor="teal"
      p={4}
      ml={"auto"}
      position="sticky"
      top={0}
      zIndex={1}
      align="center"
    >
      {" "}
      <Logo />
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
