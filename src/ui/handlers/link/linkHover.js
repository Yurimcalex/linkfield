const content = document.querySelector('.content');
let currElm = null;

export function handleLinkHover() {
	content.addEventListener('mouseover', mouseover);
	content.addEventListener('mouseout', mouseout);
}


function mouseover(e) {
	if (currElm) return;
	let target = event.target.closest('.link-list-item');
	if (!target) return;
	currElm = target;
	toggleControlsDisplay(currElm);
}


function mouseout(e) {
	if (!currElm) return;

	let relatedTarget = event.relatedTarget;
	while (relatedTarget) {
		 if (relatedTarget == currElm) return;
		 relatedTarget = relatedTarget.parentNode;
	}

	toggleControlsDisplay(currElm);
	currElm = null;
}


function toggleControlsDisplay(link) {
	link
		.querySelector('.link-controls')
		.classList.toggle('visibility');
}