import { EDIT_BUTTON } from '../../elements.js';

const openBtn = document.querySelector('.link-creator-opener');
const settingsWindow = document.querySelector('.settings-window');
const form = document.querySelector('.link-creator form');

export function handleOpenLinkForm() {
	openBtn.addEventListener('click', () => {
		openSettingsWindow();
		resetAddLinkForm();
		form.edit.classList.add('hide');
		form.add.classList.remove('hide');
	});

	content.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains(`${EDIT_BUTTON}`)) {
			openSettingsWindow();
			resetAddLinkForm();
			form.edit.classList.remove('hide');
			form.add.classList.add('hide');
		}
	});
}


function openSettingsWindow() {
	settingsWindow.classList.remove('hide');
}


function resetAddLinkForm() {
	form.link.value = '';
	form.topic.value = '';
}