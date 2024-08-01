export const formatDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };

  return date.toLocaleDateString("en-US", options);
};
