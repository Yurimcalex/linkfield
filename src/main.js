import './style.css';


async function readTextFromFile(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}


async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  console.log(textData);
}


render();