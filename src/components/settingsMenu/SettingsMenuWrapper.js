import SettingsMenu from './SettingsMenu.js';
import { openLinkFormForCreation } from '../actions.js';


export default class SettingsMenuWrapper {
	constructor(store) {
		this.openLinkFormForCreation = openLinkFormForCreation(store.useDispatch());
	}

	mount() {
		this.component = new SettingsMenu(this.openLinkFormForCreation);
	}

	update() {}
}