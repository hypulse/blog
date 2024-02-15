import { Post } from "@/types/types-post";
import TagList from "../TagList";
import thumbnailUrl from "@/utils/thumbnailUrl";
import dateText from "@/utils/dateText";

export default function ArticleView({
  post: { id, title, content, created, expand, thumbnail },
}: {
  post: Post;
}) {
  return (
    <div>
      <div
        className="absolute w-full h-64 left-0 hero"
        style={{
          backgroundImage: `url(${thumbnailUrl(id, thumbnail)})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-neutral-content max-w-screen-sm w-full p-4 mx-auto">
          <h1 className="text-4xl">{title}</h1>
          <TagList tags={expand?.tags} />
          <span className="block">{dateText(created)}</span>
        </div>
      </div>
      <div className="h-64"></div>
      <div
        className="prose mt-16"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
