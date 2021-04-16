import { Updoot } from "../entities/Updoot";
import DataLoader from "dataloader";
// [{postId: 5, userId: 10}]
// [{postId: 5, userId: 10, value: 1}]
export const createCommentLoader = () =>
  new DataLoader<{ commentId: number | null; userId: number }, Updoot | null>(
    async (keys) => {
      const updoots = await Updoot.findByIds(keys as any);
      const updootIdsToUpdoot: Record<string, Updoot> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.comment.id}`] = updoot;
      });

      return keys.map(
        (key) => updootIdsToUpdoot[`${key.userId}|${key.commentId}`]
      );
    }
  );
