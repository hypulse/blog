import { ExpandedPost } from "@/types/types";
import Link from "next/link";

export default function PostCard({
  post: { id, title, content, thumbnail, updated },
}: {
  post: ExpandedPost;
}) {
  return (
    <li className="flex items-start">
      {thumbnail && (
        <div className="avatar mr-4">
          <div className="w-32">
            <img src={thumbnail} />
          </div>
        </div>
      )}
      <div>
        <Link href={`/blog/${id}`} className="hover:underline">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-xl text-slate-500 mt-2">{content}</p>
        </Link>
        <span className="block mt-5 text-sm text-primary">
          {new Date(updated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </li>
  );
}
