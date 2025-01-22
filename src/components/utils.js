export function createHoverEffect() {
	let currElm = null;
	return function create(container, fn) {
		container.addEventListener('mouseover', (e) => mouseover(e, container, fn));
		container.addEventListener('mouseout', (e) => mouseout(e, container, fn));
	};

	function mouseover(e, container, fn) {
		if (currElm) return;
		currElm = container;
		fn(currElm);
	}

	function mouseout(e, container, fn) {
		if (!currElm) return;

		let relatedTarget = event.relatedTarget;
		while (relatedTarget) {
			 if (relatedTarget == currElm) return;
			 relatedTarget = relatedTarget.parentNode;
		}

		fn(currElm);
		currElm = null;
	}
}


export function isVisible(item) {
	const { top, height } = item.getBoundingClientRect();
	return top > 0 && top < window.innerHeight - height;
}


export function replaceSpace(str) {
	return str.split(' ').join('-');
}


export function replaceHyphen(str) {
	return str.split('-').join(' ');
}


export function getCategoryFromHash() {
  const hash = window.location.hash;
  return hash ? replaceHyphen(hash.slice(1)) : '';
}


export function getIsSmallScreen() {
  const SMALL_SCREEN_WIDTH = 650;
  return window.innerWidth <= SMALL_SCREEN_WIDTH;
}


export function updateHash(id) {
	history.pushState(null, null, `#${id}`);
}


export function scrollElementIntoView(element) {
	const coords = element.getBoundingClientRect();
	if (coords.top < 0) {
		element.scrollIntoView();
	} else if (coords.top > window.innerHeight - coords.height) {
		element.scrollIntoView(false);
	}
}