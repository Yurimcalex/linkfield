import './style.css';


async function readTextFromFile(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}


function parseText(text) {
  const blockDelimiter = '---------------------------------------------------------';
  return text
    .split(blockDelimiter)
    .filter(block => !!block)
    .map(block => block.trim())
    .map(block => {
      const blockData = block.split('\n\n');
      return {
        title: blockData[0].slice(2),
        links: blockData.slice(1).map(txt => {
          const linkData = txt.split('\n');
          return {
            topic: linkData[0],
            link: linkData[1]
          };
        })
      };
    });
}


async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  const linksData = parseText(textData);

  console.log(linksData);
}


render();