import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";
import { expectValidResolversConfig } from "@urql/exchange-graphcache/dist/types/ast";
interface UpvoteProps {
  post: PostSnippetFragment;
}

export const Upvote: React.FC<UpvoteProps> = ({ post }) => {
  const bg = useColorModeValue("red.500", "red.200");
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
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
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        mb={1}
        color={post.voteStatus === 1 ? "green" : "gray.500"}
        backgroundColor={"transparent"}
        aria-label="Upvote"
        outlineColor={"transparent"}
        icon={<Icon as={FaArrowUp} />}
        // icon={<ChevronUpIcon boxSize="24px" />}
      />

      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        mt={1}
        background={"transparent"}
        color={post.voteStatus === -1 ? "red" : "gray.500"}
        aria-label="Dwonvote"
        icon={<Icon as={FaArrowDown} />}

        // icon={<ChevronDownIcon boxSize="24px" />}
      />
    </Flex>
  );
};
