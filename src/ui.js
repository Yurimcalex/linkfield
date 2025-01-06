export default function createUI(data) {
  let html = '';

  html += '<section class="menu-panel">';
  html += '<div class="menu-opener">Open menu</div>';
  html += createMenuUL(data.map(d => d.title));
  html += '</section>';

  html += '<section class="content">';
  for (let d of data) {
    html += '<div class="link-category">';
    html += `<h2 id=${replaceSpace(d.title)}>${d.title}</h2>`;
    html += createCategoryUL(d.links);
    html += '</div>';
  }
  html += '</section>';

  return html;
}


function createMenuUL(items) {
	let html = '';
	html += '<ul class="category-menu">';
	for (let item of items) {
		html += '<li>';
		html += `<h2><a href=${`#` + replaceSpace(item)}>${item}</a></h2>`;
		html += '</li>';
	}
	html += '</ul>';
	return html;
}


function createCategoryUL(links) {
	let html = '';
	html += '<ul class="link-list">';
	for (let link of links) {
		html += '<li>';
		html += `<h3><a href=${link.link} target="_blank">${link.topic}</a></h3>`;
		html += '</li>';
	}
	html += '</ul>';
	return html;
}


function replaceSpace(str) {
	return str.split(' ').join('-');
}


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