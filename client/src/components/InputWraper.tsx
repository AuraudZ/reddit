import { Box } from "@chakra-ui/react";
import React from "react";

interface WraperProps {
  varitant?: "small" | "regular";
}

export const InputWraper: React.FC<WraperProps> = ({
  children,
  varitant = "regular",
}) => {
  return (
    <Box
      mt={varitant === "regular" ? "8" : "4"}
      marginBottom={varitant === "regular" ? "8" : "4"}
    >
      {" "}
      {children}
    </Box>
  );
};
