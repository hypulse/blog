/**
 * Function to convert pocketbase date(created, updated) to a readable date
 * @param created
 * @returns
 */
const dateText = (created: string) => {
  const event = new Date(created);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return event.toLocaleDateString(undefined, options);
};

export default dateText;
