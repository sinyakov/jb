export async function getHelpTOC() {
  const data = await fetch("./static/HelpTOC.json").then(response => response.json());

  return new Promise(res => setTimeout(res, 1000, data));
}
