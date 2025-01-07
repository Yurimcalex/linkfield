// open/close category menu feat
export function handleMenuEvents() {
	const menu = document.querySelector('.category-menu');
	const menuOpener = document.querySelector('.menu-opener');
	const content = document.querySelector('.content');
	let isOpenerClicked = false;

	menuOpener.addEventListener('click', () => {
		menu.classList.add('show');
		menuOpener.classList.add('hide');
		content.classList.add('hide');
		isOpenerClicked = true;
	});

	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target.tagName === 'A') {
			e.preventDefault();
			content.classList.remove('hide');
			const href = target.getAttribute("href");
			const elem = document.getElementById(href.slice(1));

			const scrollTarget = isOpenerClicked ? window : content;
			const dY = isOpenerClicked ? 50 : 0;
			scrollTarget.scrollTo(0, elem.offsetTop - dY);
			isOpenerClicked = false;
			
			menu.classList.remove('show');
			menuOpener.classList.remove('hide');
			history.pushState(null, null, href);
		};
	});

	window.addEventListener('resize', () => {
		menu.classList.remove('show');
		menuOpener.classList.remove('hide');
		content.classList.remove('hide');
	});
}


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