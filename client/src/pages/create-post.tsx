import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const { error } = await createPost({ input: values });
            if (!error) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                label="Title"
                type="title"
                placeholder="Title"
              />
              <Box pt={4}>
                <InputField
                  name="text"
                  label="Body"
                  placeholder="text..."
                  textarea
                />
              </Box>

              <Button
                type="submit"
                width="full"
                mt={4}
                isLoading={isSubmitting}
                variant="outline"
              >
                Create Post
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(CreatePost);
