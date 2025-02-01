import { createStore } from './redux/redux.js';
import UI from './components/UI.js';
import api from './api/api.js';
import fakeApi from './fakeApi/api.js';


async function render() {
  const links = await fakeApi.loadLinks();

  const initialData = {
  	links: { data: links },
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