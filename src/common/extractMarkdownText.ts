export const extractMarkdownText = (
  markdown: string,
  type = "json"
): string => {
  const typeBlockRegex = new RegExp(`\`\`\`${type}([\\s\\S]*?)\`\`\``);
  const codeBlockRegex = /```([\s\S]*?)```/;
  const endBlockRegex = /([\s\S]*?)```/;
  const plainTextRegex = /([\s\S]+)/;

  let match = typeBlockRegex.exec(markdown);
  if (match) {
    return match[1].trim();
  }

  match = codeBlockRegex.exec(markdown);
  if (match) {
    return match[1].trim();
  }
  match = endBlockRegex.exec(markdown);
  if (match) {
    return match[1].trim();
  }

  match = plainTextRegex.exec(markdown);
  if (match) {
    return match[1].trim();
  }

  return "";
};
