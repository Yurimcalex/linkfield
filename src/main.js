import parseText from './parser.js';
import { createStore } from './redux/redux.js';
import UI from './components/UI.js';


async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  const linksData = parseText(textData);
  const initialLinksData = linksData.getLinks();

  const initialData = {
  	links: { data: linksData.getLinks() },
  	ui: {}
  };

  const store = createStore(initialData);
  const ui = new UI(store);
  ui.mount();
  store.store.subscribe(() => ui.update());
}

render();


async function readTextFromFile(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}