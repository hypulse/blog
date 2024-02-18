import escapeHtml from "@/utils/escapeHtml";
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export async function GET(req: Request) {
  try {
    const page = new URL(req.url).searchParams.get("page") || "1";
    const type = new URL(req.url).searchParams.get("type") || "article";
    let q = new URL(req.url).searchParams.get("q") || "";
    q = escapeHtml(q);
    let tags = new URL(req.url).searchParams.get("tags") || "";
    tags = escapeHtml(tags);

    console.log(q);

    // Sanitize input
    const filters = [];
    // Post state for user is always published
    const stateFilter = pb.filter("state = {:state}", {
      state: "published",
    });
    filters.push(stateFilter);
    // Post type(article, snippet, etc.)
    // Currently, only state "article" is supported
    const typeFilter = pb.filter("type = {:type}", { type });
    filters.push(typeFilter);
    // Search query
    if (q) {
      const queryFilter = pb.filter("(title ~ {:q} || content ~ {:q})", {
        q,
      });
      filters.push(queryFilter);
    }
    // Search by tags
    if (tags) {
      const tagsFilter = tags
        .split(",")
        .map((tag) => pb.filter("tags ~ {:tag}", { tag }));
      filters.push(...tagsFilter);
    }

    const post = await pb.collection("posts").getList(Number(page), 10, {
      filter: filters.join(" && "),
      fields:
        "id,created,updated,title,thumbnail,type,state,tags,expand,content:excerpt(200,true)",
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
