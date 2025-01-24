import SettingsWindow from './SettingsWindow.js';
import LinkFrom from './linkForm/LinkFormWrapper.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectIsSettingsWindowOpened } from '../../redux/uiSlice.js';
import { selectAction } from '../../redux/actionSlice.js';
import { closeSettingsWindow } from '../actions.js';


export default class SettingsWindowWrapper {
	constructor(store) {
		this.store = store;
		this.component = null;
		this.child = null;
		useSelector(this, store, [ selectAction ]);
		useDispatch(this, store, [ closeSettingsWindow ]);

		this.updateActions = {
			'ui/settingsWindowToggled': true
		};
	}

	mount() {
		this.component = new SettingsWindow(this.closeSettingsWindow);
		this.mountChild();
	}

	update() {
		const action = this.selectAction();
		if (action in this.updateActions) {
			this.component.update();
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