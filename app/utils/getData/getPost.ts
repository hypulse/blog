import { Post, PostType, Tag } from "@/types/types";

async function getPost(
  id: string,
  type: PostType = "article"
): Promise<
  Post & {
    expand?: {
      tags: Tag[];
    };
  }
> {
  const res = await fetch(
    process.env.APP_URL + `/api/posts/${id}?type=${type}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getPost;
