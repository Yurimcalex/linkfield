import { createStore } from './redux/redux.js';
import UI from './components/UI.js';
import { getCategoryFromHash, getIsSmallScreen } from './components/utils.js';
import api from './api/api.js';
import fakeApi from './fakeApi/api.js';
import { initiateDB } from './fakeApi/db.js';
import { linksLoaded } from './redux/linksSlice.js';


import { userLogged } from './redux/userSlice.js';


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
  let ui = new UI(store);
  ui.mount();

  let isLogged = false;
  store.store.subscribe(() => {
    const state = store.store.getState();
    if (state.user.token && !isLogged) {
      //store.state.dispatch(loadLinks());
      isLogged = true;
      console.log('User logged!');
    }

    if (state.action.action === 'links/linksLoaded') {
      //let ui = new UI(store);
      //ui.mount();
      console.log('Links from db loaded!');
    }

    ui.update();
  });


  // setTimeout(() => {
  //   store.store.dispatch(userLogged(email, password));
  // }, 5000);
}

render();