import parseText from './parser.js';
import { createStore } from './redux/redux.js';
import UI from './components/UI.js';


async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  const linksData = parseText(textData);
  
  const initialAppData = linksData.getLinks();
  const store = createStore(initialAppData);
  const ui = new UI(store);
  ui.mount();
  
  //console.log(store.store.getState());
}

render();


async function readTextFromFile(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}