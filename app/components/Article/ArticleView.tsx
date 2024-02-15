import { Post } from "@/types/types-post";

export default function ArticleView({
  post: { title, content, created },
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
    </div>
  );
}
