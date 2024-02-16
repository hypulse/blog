"use client";

import { Tag } from "@/types/types-tag";
import getTags from "@/utils/getData/getTags";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TagCloud() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {tags.map(({ id, name }) => (
        <Link href={`/blog?tag=${id}`} className="btn btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"
            ></path>
          </svg>
          {name}
        </Link>
      ))}
    </div>
  );
}
