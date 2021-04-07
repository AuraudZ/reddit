import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React from "react";
import { PaginatedPosts, PostsQuery } from "../generated/graphql";
import theme from "../theme";

function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
