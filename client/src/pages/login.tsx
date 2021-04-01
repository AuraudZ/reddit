import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

export const Login: React.FC<registerProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
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
            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              }
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

export default withUrqlClient(createUrqlClient)(Login);