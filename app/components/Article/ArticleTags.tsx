import { Tag } from "@/types/types-tag";

export default function ArticleTags({ tags }: { tags?: Tag[] }) {
  if (!tags || tags.length === 0) return null;

  tags = tags.sort((a, b) => a.name.localeCompare(b.name));

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
