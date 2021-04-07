import {
  Flex,
  Icon,
  IconButton,
  outline,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";

interface UpvoteProps {
  post: PostSnippetFragment;
}

export const Upvote: React.FC<UpvoteProps> = ({ post }) => {
  const [, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [vote] = useVoteMutation();
  let upvote = null;
  if (post.voteStatus === 1) {
    upvote = "green";
  } else if (post.voteStatus === -1) {
    upvote = "red";
  } else {
    undefined;
  }
  let voteColor = null;
  const color = useColorModeValue("black", "white");
  if (post.voteStatus === 1) {
    voteColor = "green";
  } else if (post.voteStatus === -1) {
    voteColor = "red";
  } else {
    voteColor = color;
  }
  const updateAfterVote = (
    value: number,
    postId: number,
    cache: ApolloCache<VoteMutation>
  ) => {
    const data = cache.readFragment<{
      id: number;
      points: number;
      voteStatus: number | null;
    }>({
      id: "Post:" + postId,
      fragment: gql`
        fragment _ on Post {
          id
          points
          voteStatus
        }
      `,
    });

    if (data) {
      if (data.voteStatus === value) {
        return;
      }
      const newPoints =
        (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
      cache.writeFragment({
        id: "Post:" + postId,
        fragment: gql`
          fragment __ on Post {
            points
            voteStatus
          }
        `,
        data: { points: newPoints, voteStatus: value },
      });
    }
  };
  return (
    <Flex
      direction="column"
      alignItems="center"
      color={voteColor}
      justifyContent="center"
      mr={4}
    >
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        mb={1}
        color={post.voteStatus === 1 ? "green" : "gray.500"}
        backgroundColor={"transparent"}
        aria-label="Upvote"
        outlineColor={"transparent"}
        icon={<Icon as={FaArrowUp} />}
      />

      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        mt={1}
        background={"transparent"}
        color={post.voteStatus === -1 ? "red" : "gray.500"}
        aria-label="Dwonvote"
        icon={<Icon as={FaArrowDown} />}
      />
    </Flex>
  );
};
