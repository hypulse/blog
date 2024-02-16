import { Tag } from "@/types/types-tag";

async function getTags(): Promise<Tag[]> {
  const res = await fetch((process.env.APP_URL || "") + "/api/tags");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getTags;
