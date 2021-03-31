import { Heading } from "@chakra-ui/layout";
import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Flex>
      <NextLink href="/">
        <Link>
          {/* <Image borderRadius="full" boxSize="50px" alt="Logo" /> */}
          <Heading>Hello World</Heading>
        </Link>
      </NextLink>
    </Flex>
  );
};
