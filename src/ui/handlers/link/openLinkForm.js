const openBtn = document.querySelector('.link-creator-opener');
const settingsWindow = document.querySelector('.settings-window');
const form = document.querySelector('.link-creator form');

export function handleOpenLinkForm() {
	openBtn.addEventListener('click', () => {
		openSettingsWindow();
		resetAddLinkForm();
		form.edit.classList.add('hide');
	});
}


function openSettingsWindow() {
	settingsWindow.classList.remove('hide');
}


function resetAddLinkForm() {
	form.link.value = '';
	form.topic.value = '';
}