"use client";

import { ExpandedPost, PostType } from "@/types/types";
import getPosts from "@/utils/getData/getPosts";
import { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";

type ViewStates = "loading" | "loaded" | "end";

export default function PostList({ type }: { type: PostType }) {
  const [items, setItems] = useState<ExpandedPost[]>([]);
  const [viewState, setViewState] = useState<ViewStates>("loaded");
  const loaderRef = useRef(null);
  const pageRef = useRef(1);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && viewState === "loaded") {
        setViewState("loading");
        fetchMoreItems();
      }
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [viewState]);

  const fetchMoreItems = async () => {
    const { items } = await getPosts(pageRef.current++, type);
    setItems((prevItems) => [...prevItems, ...items]);
    setViewState(items.length === 0 ? "end" : "loaded");
  };

  return (
    <div>
      <ul className="space-y-16">
        {items.map((item) => (
          <PostCard key={item.id} post={item} />
        ))}
      </ul>
      <div ref={loaderRef}></div>
    </div>
  );
}
