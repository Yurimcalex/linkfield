const blockDelimiter = '---------------------------------------------------------';
const linkDelimiter = '\n\n';
const linkItemDelimiter = '\n';

export default function parseText(text) {
  return text
    .split(blockDelimiter)
    .filter(isntEmpty)
    .map(trimEmptyEdges)
    .map(parseBlock);
}

function isntEmpty(str) { return !!str; }

function trimEmptyEdges(str) { return str.trim(); }

function parseLink(str) {
  const linkData = str.split(linkItemDelimiter);
  return { 
    topic: linkData[0],
    link: linkData[1],
    type: linkData[2] ? linkData[2].slice(3) : ''
  };
}

function parseBlock(str) {
  const blockData = str.split(linkDelimiter);
  return {
    title: blockData[0].slice(2),
    links: blockData.slice(1).map(parseLink)
  };
}