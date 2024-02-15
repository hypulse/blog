const dateText = (created: string) => {
  const date = new Date(created);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default dateText;
