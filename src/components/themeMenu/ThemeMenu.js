import { dom } from '../elements.js';
import { THEME_MENU_HIDE, theme } from '../classNames.js';


export default class ThemeMenu {
	constructor() {
		this.node = dom.themeMenu.get();
		this.node.addEventListener('click', (e) => {
			const target = e.target.closest('[data-theme]');
			if (target) {
				const theme = target.dataset.theme;
				dom.themeMenu.get().classList.toggle(`${THEME_MENU_HIDE}`);
				this.setTheme(theme);
			}
		});
	}

	setTheme(newTheme) {
		const elements = document.querySelectorAll(`[class*="theme_"]`);
		for (let element of elements) {
			const classes = Array.from(element.classList)
				.filter(c => c.startsWith('theme_'));

			classes.forEach(oldClass => {
				const newClass = oldClass.replace(/[a-zA-Z0-9]+$/, newTheme);
				element.classList.replace(oldClass, newClass);
			});
		}

		for (let prop in theme) {
			theme[prop] = theme[prop].replace(/[a-zA-Z0-9]+$/, newTheme);
		}
	}

	create() {}

	update() {}
}