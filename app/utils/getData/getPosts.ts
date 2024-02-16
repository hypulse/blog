import { Post, PostType } from "@/types/types-post";

async function getPosts(
  page: number,
  type: PostType,
  q?: string,
  tags?: string
): Promise<{
  items: Post[];
}> {
  const res = await fetch(
    (process.env.APP_URL || "") +
      `/api/posts?page=${page}&type=${type}&q=${q}&tags=${tags}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getPosts;
