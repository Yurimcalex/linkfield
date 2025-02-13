import { createStore } from './redux/redux.js';
import UI from './components/UI.js';
import { getCategoryFromHash, getIsSmallScreen } from './components/utils.js';
import { initiateDB } from './fakeApi/db.js';
import { linksLoaded } from './redux/linksSlice.js';
import { menuCategorySelected } from './redux/uiSlice.js';


const initialData = {
	links: { data: [] },
	ui: { 
    menuCategory: '',
    isMenuOpened: false,
    isSmallScreen: getIsSmallScreen(),
  }
};

const store = createStore(initialData);
let ui = new UI(store);
ui.mount();
store.store.subscribe(() => ui.update());


async function render() {
	await initiateDB();
	await store.store.dispatch(linksLoaded());
	store.store.dispatch(menuCategorySelected( getCategoryFromHash() ));
}

render();