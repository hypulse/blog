"use client";

import { Tag } from "@/types/types-tag";
import getTags from "@/utils/getData/getTags";
import tagsSort from "@/utils/tagsSort";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  const addTag = (tag: Tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      return;
    }
    setSelectedTags((prev) => [...prev, tag]);
  };

  const removeTag = (tag: Tag) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      `/blog?q=${query}&tags=${selectedTags.map((t) => t.id).join(",")}`
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="input input-bordered h-auto flex flex-col mb-3">
          <div className="flex flex-wrap gap-2">
            {tagsSort(selectedTags).map((tag) => (
              <button
                key={tag.id}
                className="btn btn-sm"
                onClick={() => removeTag(tag)}
              >
                {tag.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="opacity-70"
                >
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                  ></path>
                </svg>
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search"
            className="h-12"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          ></input>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(query.length > 0 || selectedTags.length > 0)}
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {tagsSort(tags)
          .filter((tag) => !selectedTags.some((t) => t.id === tag.id))
          .map((tag) => (
            <button
              key={tag.id}
              className="btn btn-sm btn-ghost"
              onClick={() => addTag(tag)}
            >
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
              {tag.name}
            </button>
          ))}
      </div>
    </>
  );
}
