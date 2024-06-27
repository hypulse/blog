/**
 * Returns the URL of the thumbnail of a post (pocketbase file)
 * @param id
 * @param thumbnail
 * @returns
 */
const thumbnailUrl = (id: string, thumbnail?: string) => {
  if (!thumbnail) {
    return "";
  }

  return `http://localhost:8080/api/files/posts/${id}/${thumbnail}`;
};

export default thumbnailUrl;
