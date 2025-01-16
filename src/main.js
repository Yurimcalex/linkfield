import parseText from './parser.js';
import createUI from './ui/ui.js';



import { createStore } from './redux/redux.js';




async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  const linksData = parseText(textData);
  

  const store = createStore(linksData.getLinks());
  console.log(store);

  //createUI(linksData);
}







render();



async function readTextFromFile(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}