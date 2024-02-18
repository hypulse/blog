import escapeHtml from "@/utils/escapeHtml";
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export async function GET(req: Request) {
  try {
    const page = new URL(req.url).searchParams.get("page") || "1";
    const type = new URL(req.url).searchParams.get("type") || "article";
    let q = new URL(req.url).searchParams.get("q") || "";
    let tags = new URL(req.url).searchParams.get("tags") || "";

    // Sanitize input
    q = escapeHtml(q);
    tags = escapeHtml(tags);
    const stateFilter = pb.filter("state = {:state}", {
      state: "published",
    });
    const typeFilter = pb.filter("type = {:type}", { type });
    let queryFilter: string[] = [];
    let tagsFilter: string[] = [];
    if (q) {
      queryFilter = [
        pb.filter("(title ~ {:q} || content ~ {:q})", {
          q,
        }),
      ];
    }
    if (tags) {
      tagsFilter = tags
        .split(",")
        .map((tag) => pb.filter("tags ~ {:tag}", { tag }));
    }
    const filter = [
      stateFilter,
      typeFilter,
      ...queryFilter,
      ...tagsFilter,
    ].join(" && ");

    const post = await pb.collection("posts").getList(Number(page), 10, {
      filter,
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
