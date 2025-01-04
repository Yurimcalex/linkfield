//import './style.css';
import parseText from './parser.js';

function createUI(data) {
  let html = '';
  for (let d of data) {
    html += '<div>';
    html += `<h2>${d.title}</h2>`;
    for (let link of d.links) {
      html += '<ul>';
      html += `<h3><a href=${link.link} target="_blank">${link.topic}</a></h3>`;
      html += '</ul>';
    }
    html += '</div>';
  }

  return html;
}


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