import { SETTINGS_MENU, OPEN_SETTINGS_BUTTON, SETTINGS_WINDOW } from '../classNames.js';


export default class SettingsMenu {
	constructor(openSettingsWindowAction) {
		this.node = document.querySelector(`.${SETTINGS_MENU}`);
		this.node.addEventListener('click', (e) => {
			const target = e.target;
			if (target.classList.contains(`${OPEN_SETTINGS_BUTTON}`)) {
				openSettingsWindowAction();
			}
		});
	}

	create() {}

	update() {}
}