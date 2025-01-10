const settingsWindow = document.querySelector('.settings-window');

export function handleCloseLinkForm() {
	settingsWindow.addEventListener('click', closeForm);
}


function closeForm(e) {
	const target = e.target;
	if (target.closest('.close-btn')) {
		closeSettingsWindow();
	}
}


function closeSettingsWindow() {
	settingsWindow.classList.add('hide');
}