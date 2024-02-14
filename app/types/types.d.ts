type DefaultPbFields = {
  id: string;
  collectionId: string;
  created: string;
  updated: string;
};

type Tag = DefaultPbFields & {
  name: string;
};

type PostType = "article" | "snippet";

type PostStatus = "draft" | "published" | "archived";

type Post = DefaultPbFields & {
  title: string;
  content: string;
  type: PostType;
  status: PostStatus;
  tags: Tag[];
};

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type { Tag, PostType, PostStatus, Post, PageProps };
