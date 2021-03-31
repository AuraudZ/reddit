import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import { WraperVaritant, Wrapper } from "./Wrapper";

interface LayoutProps {
  variant?: WraperVaritant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <ChakraProvider>
        <NavBar />
        <Wrapper varitant={variant}>{children}</Wrapper>
      </ChakraProvider>
    </>
  );
};
