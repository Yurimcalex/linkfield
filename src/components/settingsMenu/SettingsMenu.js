import { dom } from '../elements.js';
import { THEME_MENU_HIDE } from '../classNames.js'; 


export default class SettingsMenu {
	constructor(openSettingsWindowAction) {
		this.node = dom.settingsMenu.get();
		this.node.addEventListener('click', (e) => {
			const target = e.target;
			if (dom.settingsMenu.getOpenButton(target)) {
				openSettingsWindowAction();
			} else if (dom.settingsMenu.getOpenThemeMenuBtn(target)) {
				dom.themeMenu.get().classList.toggle(`${THEME_MENU_HIDE}`);
			}
		});
	}

	create() {}

	update() {}
}