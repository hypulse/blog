import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export async function GET(
  req: Request,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const post = await pb.collection("posts").getOne(id, { expand: "tags" });
    if (post.status !== "published") {
      throw new Error("Post not found");
    }
    return NextResponse.json(post);
  } catch (err) {
    console.error("Failed to fetch post:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch post" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
