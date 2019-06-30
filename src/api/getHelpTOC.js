import { MIN_DATA_REQUEST_DELAY } from "../constants";

export async function getHelpToc() {
  const data = await fetch("/static/HelpTOC.json").then(response => response.json());

  return new Promise(res => setTimeout(res, MIN_DATA_REQUEST_DELAY, data));
}
