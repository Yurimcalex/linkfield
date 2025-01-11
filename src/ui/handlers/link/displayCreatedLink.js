import { createLink } from '../../linkItem.js';
import { removeCurrentFocus } from './linkClick.js';
import { focusOnLink } from './linkEdit.js';

const form = document.querySelector('.link-creator form');
const settingsWindow = document.querySelector('.settings-window');

export function handleDisplayCreatedLink() {
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


function closeSettingsWindow() {
	settingsWindow.classList.add('hide');
}