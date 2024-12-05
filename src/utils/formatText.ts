export function convertCamelCaseToTitleCase(input: string) {
  if (!input) return "";

  const result = input.replace(/([A-Z])/g, " $1").trim();

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function addSuffix(number: number, word: string) {
  if (number === 1) {
    return number + " " + word;
  } else if (number > 1) {
    return number + " " + word + "s";
  } else {
    return 0 + " " + word
  }
}
