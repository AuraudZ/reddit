import { Heading } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { CommentForm } from "../../components/CommentForm";
import { Comments } from "../../components/Comments";
import { EditDeletePostMenu } from "../../components/EditDeletePostMenu";
import { Layout } from "../../components/Layout";
import { Upvote } from "../../components/Upvote";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { withApollo } from "../../utils/withApollo";

const Post = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();
  if (loading) {
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
      <CommentForm />
      <Comments />
    </Layout>
  );
};
export default withApollo({ ssr: true })(Post);
