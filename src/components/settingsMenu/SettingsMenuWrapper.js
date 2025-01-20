import SettingsMenu from './SettingsMenu.js';
import { toggleSettingWindow } from '../actions.js';


export default class SettingsMenuWrapper {
	constructor(store) {
		this.toggleSettingWindow = toggleSettingWindow(store.useDispatch())
	}

	mount() {
		this.component = new SettingsMenu(this.toggleSettingWindow);
	}

	update() {}
}