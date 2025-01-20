export const toGoogleSearchUrl = (query: string) => {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};
