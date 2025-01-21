import SettingsWindow from './SettingsWindow.js';
import LinkFrom from './linkForm/LinkFormWrapper.js';
import { selectIsSettingsWindowOpened } from '../../redux/uiSlice.js';
import { closeSettingsWindow } from '../actions.js';


export default class SettingsWindowWrapper {
	constructor(store) {
		this.store = store;
		this.selectIsSettingsWindowOpened = store.useSelector(selectIsSettingsWindowOpened);
		this.closeSettingsWindow = closeSettingsWindow(store.useDispatch());
	}

	mount() {
		this.isSettingsWindowOpened = this.selectIsSettingsWindowOpened();
		this.component = new SettingsWindow(this.closeSettingsWindow);

		this.mountChild();
	}

	update() {
		const isSettingsWindowOpened = this.selectIsSettingsWindowOpened();
		if (isSettingsWindowOpened !== this.isSettingsWindowOpened) {
			this.component.update();
			this.isSettingsWindowOpened = isSettingsWindowOpened;
		}

		this.updateChild();
	}

	mountChild() {
		this.child = new LinkFrom(this.store);
		this.child.mount();
	}

	updateChild() {
		this.child.update();
	}
}