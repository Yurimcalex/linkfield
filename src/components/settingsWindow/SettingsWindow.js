import { SETTINGS_WINDOW_HIDE } from '../classNames.js';
import { dom } from '../elements.js';


export default class SettingsWindow {
	constructor(closeAction) {
		this.node = dom.getSettingsWindow();
		this.node.addEventListener('click', (e) => {
			const target = e.target;
			if (dom.getCloseButton(target)) {
				closeAction();
			}
		});
	}

	toggleWindow() {
		this.node.classList.toggle(`${SETTINGS_WINDOW_HIDE}`);
	}

	create() {}

	update() {
		this.toggleWindow();
	}
}