import { Tag } from "@/types/types-tag";

/**
 * Function to sort tags by name
 * @param tags
 * @returns
 */
const tagsSort = (tags: Tag[]) => {
  return tags.sort((a, b) => a.name.localeCompare(b.name));
};

export default tagsSort;
