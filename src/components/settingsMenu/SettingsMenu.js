import { dom } from '../elements.js';


export default class SettingsMenu {
	constructor(openSettingsWindowAction) {
		this.node = dom.settingsMenu.get();
		this.node.addEventListener('click', (e) => {
			const target = e.target;
			if (dom.settingsMenu.getOpenButton(target)) {
				openSettingsWindowAction();
			}
		});
	}

	create() {}

	update() {}
}