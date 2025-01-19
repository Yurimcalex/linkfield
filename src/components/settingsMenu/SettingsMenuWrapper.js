import SettingsMenu from './SettingsMenu.js';
import { selectIsSettingsWindowOpened } from '../../redux/uiSlice.js';
import { toggleSettingWindow } from '../actions.js';


export default class SettingsMenuWrapper {
	constructor(store) {
		this.selectIsSettingsWindowOpened = store.useSelector(selectIsSettingsWindowOpened);
		this.toggleSettingWindow = toggleSettingWindow(store.useDispatch())
	}

	mount() {
		this.isSettingsWindowOpened = this.selectIsSettingsWindowOpened();
		this.component = new SettingsMenu(this.toggleSettingWindow);
	}

	update() {
		const isSettingsWindowOpened = this.selectIsSettingsWindowOpened();
		if (isSettingsWindowOpened !== this.isSettingsWindowOpened) {
			this.component.update();
			this.isSettingsWindowOpened = isSettingsWindowOpened;
		}
	}
}