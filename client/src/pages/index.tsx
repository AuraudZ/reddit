import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeletePostMenu } from "../components/EditDeletePostMenu";
import { Layout } from "../components/Layout";
import { Upvote } from "../components/Upvote";
import { usePostsQuery } from "../generated/graphql";
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 33,
    cursor: null as null | string,
  });
  const { data, loading } = usePostsQuery({
    variables,
  });
  if (!loading && !data) {
    return <div>You got no posts lol</div>;
  }
  const editColor = useColorModeValue("gray", "red");

  return (
    <Layout>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} rounded={1}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex
                key={p.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="12"
              >
                <Upvote post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Box color="gray.500" fontWeight="semibold">
                    By {p.creator.username}
                  </Box>
                  <Flex>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>

                    <Box ml={"auto"}>
                      <EditDeletePostMenu id={p.id} creatorId={p.creator.id} />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
            colorScheme="teal"
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default Index;
