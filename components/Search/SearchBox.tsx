"use client";

import { Tag } from "@/types/types-tag";
import getTags from "@/utils/api/getTags";
import tagsSort from "@/utils/tagsSort";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormTagButtons } from "./FormTagButtons";
import { TagButtons } from "./TagButtons";

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  const isSearchable = query.length > 0 || selectedTags.length > 0;

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
              <FormTagButtons
                key={tag.id}
                name={tag.name}
                onClick={() => removeTag(tag)}
              />
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
            disabled={!isSearchable}
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {tagsSort(tags)
          .filter((tag) => !selectedTags.some((t) => t.id === tag.id))
          .map((tag) => (
            <TagButtons
              key={tag.id}
              name={tag.name}
              onClick={() => addTag(tag)}
            />
          ))}
      </div>
    </>
  );
}
