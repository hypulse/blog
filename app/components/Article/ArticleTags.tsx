import { Tag } from "@/types/types-tag";
import tagsSort from "@/utils/tagsSort";

export default function ArticleTags({ tags }: { tags?: Tag[] }) {
  if (!tags || tags.length === 0) return null;

  tags = tagsSort(tags);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ id, name }) => (
        <span key={id} className="badge">
          {name}
        </span>
      ))}
    </div>
  );
}
