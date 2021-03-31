import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostMenuProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostMenu: React.FC<EditDeletePostMenuProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
        />
        <MenuList>
          <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
            <MenuItem icon={<EditIcon />}>Edit Post</MenuItem>
          </NextLink>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => {
              deletePost({ id });
            }}
          >
            Delete Post
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
