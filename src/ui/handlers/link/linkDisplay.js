import { elements } from '../../elements.js';
import { createLink } from '../../ui.js';
import { removeCurrentFocus } from './linkClick.js';
import { focusOnLink } from './linkEdit.js';

const { linkForm: form, settingsWindow } = elements;


export function handleLinkDisplay() {
	form.add.addEventListener('click', (e) => {
		e.preventDefault();
		display();
	});
}


function display() {
	const data = getFormData(form);
	removeCurrentFocus();
	createLink(data);
	closeSettingsWindow();
	focusOnLink(data.category);
}


export function getFormData(form) {
	const data = { link: '', topic: '', type: '', category: '' };
	for (let prop in data) {
		data[prop] = form[prop].value;
	}
	return data;
}


export function closeSettingsWindow() {
	settingsWindow.classList.add('hide');
}