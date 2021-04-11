import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React from "react";
import { PaginatedPosts, PostsQuery } from "../generated/graphql";
import theme from "../theme";
import { DarkModeFlash } from "../components/DarkModeFlash";
function App({ Component, pageProps }: any) {
  return (
    <DarkModeFlash cookies={pageProps.cookies}>
      <CSSReset />
      <Component {...pageProps} />
    </DarkModeFlash>
  );
}

export { getServerSideProps } from "../components/DarkModeFlash";

export default App;
