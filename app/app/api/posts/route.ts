import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export async function GET(req: Request) {
  try {
    const page = new URL(req.url).searchParams.get("page") || "1";
    const type = new URL(req.url).searchParams.get("type") || "article";
    const q = new URL(req.url).searchParams.get("q") || "";
    const tags = new URL(req.url).searchParams.get("tags") || "";

    const filters = [];
    if (q) {
      const queryFilter = `(title ~ "${q}" || content ~ "${q}")`;
      filters.push(queryFilter);
    }
    if (tags) {
      const tagsFilter = tags.split(",").map((tag) => `tags ~ "${tag}"`);
      filters.push(...tagsFilter);
    }

    const post = await pb.collection("posts").getList(Number(page), 10, {
      filter: [
        `status = "published"`,
        `type = "${type}"`,
        `content ~ "${q}"`,
        ...filters,
      ].join(" && "),
      fields:
        "id,created,updated,title,thumbnail,type,status,tags,expand,content:excerpt(200,true)",
      sort: "-updated",
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
