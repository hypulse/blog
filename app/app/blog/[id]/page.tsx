import ArticleView from "@/components/Article/ArticleView";
import { PageProps } from "@/types/types";
import getPost from "@/utils/getData/getPost";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params: { id } }: PageProps<{ id: string }>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title, thumbnail } = await getPost(id);

  const images = (await parent).openGraph?.images || [];
  if (thumbnail) {
    images.unshift(thumbnail);
  }

  return {
    title,
    openGraph: {
      images,
    },
  };
}

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const data = await getPost(id);

  return <ArticleView post={data} />;
}
