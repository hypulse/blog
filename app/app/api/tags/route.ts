import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export async function GET(req: Request) {
  try {
    const post = await pb.collection("tags").getFullList();
    return NextResponse.json(post);
  } catch (err) {
    console.error("Failed to fetch tags:", err);

    // @ts-expect-error
    if (err.isAbort) {
      return new Response(null, { status: 429 });
    }

    return new Response(JSON.stringify({ error: "Failed to fetch tags" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
