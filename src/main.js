import { createStore } from './redux/redux.js';
import UI from './components/UI.js';
import { getCategoryFromHash, getIsSmallScreen } from './components/utils.js';
import api from './api/api.js';
import fakeApi from './fakeApi/api.js';
import { initiateDB } from './fakeApi/db.js';

async function render() {
  await initiateDB();
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