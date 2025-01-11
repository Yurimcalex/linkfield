const content = document.querySelector('.content');
let prevElm = null;

export function handleLinkClick() {
	content.addEventListener('click', сlick);
}


function сlick(e) {
	const target = e.target.closest('.link-list-item');
	if (target) {
		if (prevElm) removeCurrentFocus();
		target.classList.add('current');
		prevElm = target;
	}
}


export function removeCurrentFocus() {
	if (prevElm) prevElm.classList.remove('current');
}