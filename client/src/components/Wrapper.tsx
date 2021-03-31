import { Box } from "@chakra-ui/react";
import React from "react";

export type WraperVaritant = "small" | "regular";
interface WraperProps {
  varitant?: WraperVaritant;
}

export const Wrapper: React.FC<WraperProps> = ({
  children,
  varitant = "regular",
}) => {
  return (
    <Box
      maxW={varitant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {" "}
      {children}
    </Box>
  );
};
