import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex p={1}>
      <IconButton
        aria-label="Toggle Dark & Light Mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  );
}
