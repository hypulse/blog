/**
 * Converts a pocketbase date string (created, updated) to a readable date.
 * @param created The date string to be converted.
 * @returns The formatted date text.
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
