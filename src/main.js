//import './style.css';


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


function parseText(text) {
  const blockDelimiter = '---------------------------------------------------------';
  const linkDelimiter = '\n\n';
  const linkItemDelimiter = '\n';
  
  return text
    .split(blockDelimiter)
    .filter(isntEmpty)
    .map(trimEmptyEdges)
    .map(parseBlock);


  function isntEmpty(str) { return !!str; }

  function trimEmptyEdges(str) { return str.trim(); }

  function parseLink(str) {
    const linkData = str.split(linkItemDelimiter);
    return { topic: linkData[0], link: linkData[1] };
  }

  function parseBlock(str) {
    const blockData = str.split(linkDelimiter);
    return {
      title: blockData[0].slice(2),
      links: blockData.slice(1).map(parseLink)
    };
  }
}


async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  const linksData = parseText(textData);
  const htmlText = createUI(linksData);
  
  document.body.innerHTML = htmlText;
}


render();