import { Post } from "@/types/types-post";
import TagList from "../TagList";

export default function ArticleView({
  post: { title, content, created, expand },
}: {
  post: Post;
}) {
  return (
    <div>
      <h1>{title}</h1>
      <span className="block">{created}</span>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className="flex flex-wrap gap-2">
        <TagList tags={expand?.tags} />
      </div>
    </div>
  );
}
