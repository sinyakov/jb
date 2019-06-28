export async function getHelpToc() {
  const data = await fetch("/static/HelpTOC.json").then(response => response.json());

  return new Promise(res => setTimeout(res, 0, data));
}
