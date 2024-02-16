const dateText = (created: string) => {
  const event = new Date(created);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return event.toLocaleDateString(undefined, options);
};

export default dateText;
