import { CLOSE_BUTTON, elements } from '../../elements.js';

const { settingsWindow } = elements;


export function handleLinkFormClose() {
	settingsWindow.addEventListener('click', closeForm);
}


function closeForm(e) {
	const target = e.target;
	if (target.closest(`.${CLOSE_BUTTON}`)) {
		closeSettingsWindow();
	}
}


function closeSettingsWindow() {
	settingsWindow.classList.add('hide');
}