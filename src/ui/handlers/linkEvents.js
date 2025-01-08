import { createLink } from '../ui.js';

const openLinkCreatorBtn = document.querySelector('.link-creator-opener');
const settingsWindow = document.querySelector('.settings-window');
const addLinkForm = document.querySelector('.link-creator form');


export function handleLinkEvents() {
	openLinkCreatorBtn.addEventListener('click', () => {
		settingsWindow.classList.remove('hide');
	});

	addLinkForm.add.addEventListener('click', (e) => {
		const linkData = getNewLinkData();
		e.preventDefault();
		createLink(linkData);
		settingsWindow.classList.add('hide');
	});

	settingsWindow.addEventListener('click', (e) => {
		const target = e.target;
		if (target.closest('.close-btn')) {
			settingsWindow.classList.add('hide');
		}
	});
}


function getNewLinkData() {
	const data = {
		link: addLinkForm.link.value,
		topic: 'new link',
		type: addLinkForm.type.value,
		category: addLinkForm.category.value
	};
	addLinkForm.link.value = '';
	return data;
}