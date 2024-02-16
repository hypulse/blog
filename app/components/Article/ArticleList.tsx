"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Post } from "@/types/types-post";
import getPosts from "@/utils/getData/getPosts";
import Link from "next/link";
import { useRef, useState } from "react";
import TagList from "../TagList";
import thumbnailUrl from "@/utils/thumbnailUrl";
import dateText from "@/utils/dateText";

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
                <div className="w-32">
                  <img src={thumbnailUrl(id, thumbnail)} />
                </div>
              </div>
            )}
            <div className="grow space-y-2">
              <Link href={`blog/${id}`} className="hover:underline">
                <h3 className="text-2xl">{title}</h3>
                <p className="text-xl text-gray-500">{content}</p>
              </Link>
              <TagList tags={expand?.tags} />
              <span className="block text-sm text-primary">
                {dateText(updated)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div ref={loaderRef}></div>
    </div>
  );
}
