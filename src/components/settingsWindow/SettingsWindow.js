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
		this.node.classList.toggle('hide');
	}

	create() {}

	update() {
		this.toggleWindow();
	}
}