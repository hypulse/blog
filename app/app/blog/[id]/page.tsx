import { PageProps } from "@/types/types";
import getPost from "@/utils/getData/getPost";
import { getMetaTitle } from "@/utils/metadata-utils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params.id;

  const data = await getPost(id);

  return {
    title: getMetaTitle(data.title),
  };
}

export default async function Page({ params: { id } }: PageProps) {
  const data = await getPost(id);

  return (
    <article
      className="prose"
      dangerouslySetInnerHTML={{
        __html: `<h1>${data.title}</h1>${data.content}`,
      }}
    />
  );
}
