import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
const client = new ApolloClient({
  credentials: "include",
  uri: "localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
