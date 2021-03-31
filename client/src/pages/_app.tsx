import { ChakraProvider, CSSReset, useColorMode } from "@chakra-ui/react";
import { Chakra } from "../utils/Chakra";
import theme from "../theme";
function App({ Component, pageProps }: any) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </Chakra>
  );
}

export default App;
