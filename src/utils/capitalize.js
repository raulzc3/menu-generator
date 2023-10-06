export default function capitalize(text) {
  let updatedText = text.split("");
  updatedText[0] = updatedText[0].toUpperCase();
  return updatedText.join("");
}
