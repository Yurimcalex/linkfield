import parseText from './parser.js';
import { createStore } from './redux/redux.js';
import UI from './components/UI.js';


async function render() {
  const textData = await readTextFromFile('initialLinkList.txt');
  const linksData = parseText(textData);
  const initialLinksData = linksData.getLinks();

  const initialData = {
  	links: { data: linksData.getLinks() },
  	ui: { 
      menuCategory: getCategoryFromHash(location),
      isMenuOpened: false,
      isSmallScreen: getIsSmallScreen(),
    }
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


function getCategoryFromHash(location) {
  const hash = location.hash;
  if (hash) {
    return hash.slice(1).split('-').join(' ');
  }
  return '';
}


function getIsSmallScreen() {
  const SMALL_SCREEN_WIDTH = 650;
  return window.innerWidth <= SMALL_SCREEN_WIDTH;
}