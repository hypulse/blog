import { Tag } from "@/types/types-tag";

export default function TagList({ tags }: { tags?: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map(({ id, name }) => (
        <span key={id} className="badge">
          {name}
        </span>
      ))}
    </div>
  );
}
