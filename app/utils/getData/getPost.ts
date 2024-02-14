import { ExpandedPost } from "@/types/types";

async function getPost(id: string): Promise<ExpandedPost> {
  const res = await fetch((process.env.APP_URL || "") + `/api/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getPost;
