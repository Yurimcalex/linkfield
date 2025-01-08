const openLinkCreatorBtn = document.querySelector('.link-creator-opener');
const settingsWindow = document.querySelector('.settings-window');
const addLinkForm = document.querySelector('.link-creator form');


export function handleLinkEvents() {
	openLinkCreatorBtn.addEventListener('click', () => {
		settingsWindow.classList.remove('hide');
	});

	addLinkForm.add.addEventListener('click', (e) => {
		e.preventDefault();
		getNewLinkData();
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
	console.log(addLinkForm.link.value, addLinkForm.category.value, addLinkForm.type.value);
	addLinkForm.link.value = '';
}