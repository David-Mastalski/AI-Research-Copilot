export function formatFileName(
  name: string,
  maxLength = 24,
  startCharsLength = 10,
) {
  if (!name || name.length <= maxLength) return name;

  const dotIndex = name.lastIndexOf(".");
  const extension = dotIndex !== -1 ? name.slice(dotIndex) : "";
  const nameWithoutExt = dotIndex !== -1 ? name.slice(0, dotIndex) : name;

  const availableSpace = maxLength - extension.length - 3;
  const endCharsLength = availableSpace - startCharsLength;

  if (endCharsLength <= 0) {
    return `${nameWithoutExt.slice(0, availableSpace)}...${extension}`;
  }

  const startPart = nameWithoutExt.slice(0, startCharsLength);
  const endPart = nameWithoutExt.slice(-endCharsLength);

  return `${startPart}...${endPart}${extension}`;
}
