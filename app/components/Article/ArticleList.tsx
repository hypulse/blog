"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Post } from "@/types/types-post";
import getPosts from "@/utils/getData/getPosts";
import Link from "next/link";
import { useRef, useState } from "react";
import TagList from "../TagList";

export default function ArticleList() {
  const [items, setItems] = useState<Post[]>([]);
  const page = useRef(1);
  const { loaderRef } = useInfiniteScroll(async () => {
    const { items } = await getPosts(page.current++, "article");
    if (items.length === 0) {
      return "END_REACHED";
    }
    setItems((prev) => [...prev, ...items]);
    return "IDLE";
  });

  return (
    <div>
      <ul className="space-y-16">
        {items.map(({ id, thumbnail, title, content, updated, expand }) => (
          <li key={id} className="flex">
            {thumbnail && (
              <div className="avatar mr-4">
                <div className="w-32 rounded">
                  <img
                    src={`http://localhost:8080/api/files/posts/${id}/${thumbnail}?thumb=128x128`}
                  />
                </div>
              </div>
            )}
            <div>
              <Link href={`blog/${id}`} className="hover:underline">
                <h3>{title}</h3>
                <p>{content}</p>
              </Link>
              <TagList tags={expand?.tags} />
              <span>{updated}</span>
            </div>
          </li>
        ))}
      </ul>
      <div ref={loaderRef}></div>
    </div>
  );
}
