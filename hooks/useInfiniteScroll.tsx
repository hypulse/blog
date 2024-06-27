"use client";

import { useEffect, useRef, useState } from "react";

type ScrollState = "IDLE" | "LOADING" | "END_REACHED";

export default function useInfiniteScroll(
  fetchJob: () => Promise<"IDLE" | "END_REACHED">
) {
  const [scrollState, setScrollState] = useState<ScrollState>("IDLE");
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && scrollState === "IDLE") {
        setScrollState("LOADING");
        fetchItems();
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
  }, [scrollState]);

  const fetchItems = async () => {
    const state = await fetchJob();
    setScrollState(state);
  };

  return {
    scrollState,
    loaderRef,
  };
}
