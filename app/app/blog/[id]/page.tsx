import ArticleView from "@/components/Article/ArticleView";
import { PageProps } from "@/types/types";
import { BLOG_NAME } from "@/utils/constants";
import getPost from "@/utils/getData/getPost";
import thumbnailUrl from "@/utils/thumbnailUrl";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params: { id } }: PageProps<{ id: string }>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title, thumbnail } = await getPost(id);

  const images = (await parent).openGraph?.images || [];
  if (thumbnail) {
    images.unshift(thumbnailUrl(id, thumbnail));
  }

  return {
    title: `${title} - ${BLOG_NAME}`,
    openGraph: {
      images,
    },
  };
}

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const post = await getPost(id);

  return <ArticleView post={post} />;
}
