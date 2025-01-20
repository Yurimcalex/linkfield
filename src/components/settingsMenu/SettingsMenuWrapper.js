import SettingsMenu from './SettingsMenu.js';
import { toggleSettingWindow, changeLinkFormMode } from '../actions.js';


export default class SettingsMenuWrapper {
	constructor(store) {
		this.toggleSettingWindow = toggleSettingWindow(store.useDispatch());
		this.changeLinkFormMode = changeLinkFormMode(store.useDispatch());
		this.openLinkFormForCreation = () => {
			this.toggleSettingWindow();
			this.changeLinkFormMode('creation');
		};
	}

	mount() {
		this.component = new SettingsMenu(this.openLinkFormForCreation);
	}

	update() {}
}