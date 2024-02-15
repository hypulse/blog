import { DefaultPbFields } from "./types";
import { Tag } from "./types-tag";

type PostType = "article" | "snippet";
type PostState = "draft" | "published" | "archived";

type Post = DefaultPbFields & {
  title: string;
  content: string;
  thumbnail?: string;
  type: PostType;
  state: PostState;
  tags: Tag[];
  expand?: {
    tags: Tag[];
  };
};

export type { PostType, PostState, Post };
