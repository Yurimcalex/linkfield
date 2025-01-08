export function handleLinkEvents() {
	const openAddLinkBtn = document.querySelector('.add-link-opener');
	const settingsWindow = document.querySelector('.settings-window');
	
	const linkInput = document.querySelector('.link-creator input');
	const linkType = document.querySelector('.link-creator select');
	const addNewLinkBtn = document.querySelector('.link-creator button');


	openAddLinkBtn.addEventListener('click', () => {
		settingsWindow.classList.remove('hide');
	});

	addNewLinkBtn.addEventListener('click', (e) => {
		e.preventDefault();
		console.log(linkInput.value, linkType.value);
		linkInput.value = '';
		settingsWindow.classList.add('hide');
	});
}


export function loadingComplete() {
	setTimeout(() => {
		document
			.querySelector('.loading-cover')
			.style.display = 'none';
		}, 0);
}