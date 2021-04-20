import { selectHttpOptionsAndBody } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Link,
  toast,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { sleep } from "../utils/sleep";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

export const Login: React.FC<registerProps> = ({}) => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const toast = useToast();

  const formBackground = useColorModeValue("", "");
  return (
    <Wrapper varitant="small">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.user,
                  },
                });
                cache.evict({ fieldName: "posts:{}" });
              },
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              }
              toast({
                title: "Login Successful.",
                description: "Logged In Successfully.",
                status: "success",
                duration: 5000,
                variant: "top-accent",
                isClosable: true,
              });
              sleep(5000);
              // worked
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                label="Username"
                type="Username Or Email"
                placeholder="Username"
              />
              <Box pt={4}>
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                />
              </Box>
              <Flex mt={2}>
                <NextLink href="/forgot-password">
                  <Link ml={"auto"}>Forgot Password?</Link>
                </NextLink>
              </Flex>
              <Button
                type="submit"
                width="full"
                mt={4}
                isLoading={isSubmitting}
                variant="outline"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
