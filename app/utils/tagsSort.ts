import { Tag } from "@/types/types-tag";

const tagsSort = (tags: Tag[]) => {
  return tags.sort((a, b) => a.name.localeCompare(b.name));
};

export default tagsSort;
