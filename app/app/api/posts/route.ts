import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export async function GET(req: Request) {
  try {
    const page = new URL(req.url).searchParams.get("page") || "1";
    const type = new URL(req.url).searchParams.get("type") || "article";
    const post = await pb.collection("posts").getList(Number(page), 10, {
      filter: [`type = "${type}"`, `status = "published"`].join(" && "),
      sort: "updated",
      expand: "tags",
      skipTotal: true,
    });
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
