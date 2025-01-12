import { LINK_LIST_ITEM, LINK_CONTROLS, elements } from '../../elements.js';

const { content } = elements;
let currElm = null;
let hoveredElm = null;


export function handleLinkHover() {
	content.addEventListener('mouseover', mouseover);
	content.addEventListener('mouseout', mouseout);
}


function mouseover(e) {
	if (currElm) return;
	let target = event.target.closest(`.${LINK_LIST_ITEM}`);
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

	if (hoveredElm) {
		toggleControlsDisplay(hoveredElm);
		hoveredElm = null;
	}
}


function toggleControlsDisplay(link) {
	elements.select(link, 'linkControls').classList.toggle('visibility');
}


export function displayControls(link) {
	elements.select(link, 'linkControls').classList.toggle('visibility');
	hoveredElm = link;
}