import { BLOG_NAME } from "@/types/constants";

const renderMetaTitle = (title?: string): string => {
  return title ? title + ` - ${BLOG_NAME}` : `${BLOG_NAME}`;
};

export default renderMetaTitle;
