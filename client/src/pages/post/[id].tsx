import { Heading } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { EditDeletePostMenu } from "../../components/EditDeletePostMenu";
import { Layout } from "../../components/Layout";
import { Upvote } from "../../components/Upvote";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  if (fetching) {
    return (
      <Layout>
        <div>Loading</div>
      </Layout>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex
        key={data.post.id}
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="12"
      >
        <Upvote post={data.post} />
        <Box flex={1}>
          <Heading mb={4}>{data.post.title}</Heading>
          <div> {data.post.text} </div>
        </Box>

        <Box mr="auto">
          <EditDeletePostMenu
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
      </Flex>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
