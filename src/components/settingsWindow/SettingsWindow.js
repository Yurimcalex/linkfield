import { SETTINGS_WINDOW, CLOSE_BUTTON } from '../classNames.js';
 

export default class SettingsWindow {
	constructor(closeAction) {
		this.node = document.querySelector(`.${SETTINGS_WINDOW}`);
		this.node.addEventListener('click', (e) => {
			const target = e.target;
			if (target.closest(`.${CLOSE_BUTTON}`)) {
				closeAction();
			}
		});
	}

	toggleWindow() {
		this.node.classList.toggle('hide');
	}

	create() {}

	update() {
		this.toggleWindow();
	}
}