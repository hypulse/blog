const thumbnailUrl = (id: string, thumbnail: string) => {
  return `http://localhost:8080/api/files/posts/${id}/${thumbnail}`;
};

export default thumbnailUrl;
