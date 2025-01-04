import './style.css';
import parseText from './parser.js';
import createUI from './ui.js';


async function readTextFromFile(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}


async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  const linksData = parseText(textData);
  const htmlText = createUI(linksData);
  
  document.body.innerHTML = htmlText;
}


render();