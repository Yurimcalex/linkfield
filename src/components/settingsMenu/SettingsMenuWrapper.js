import SettingsMenu from './SettingsMenu.js';
import { useDispatch } from '../../redux/redux.js';
import { openLinkFormForCreation } from '../actions.js';


export default class SettingsMenuWrapper {
	constructor(store) {
		this.component = null;
		useDispatch(this, store, [ openLinkFormForCreation ]);
	}

	mount() {
		this.component = new SettingsMenu(this.openLinkFormForCreation);
	}

	update() {
		this.component.update();
	}
}