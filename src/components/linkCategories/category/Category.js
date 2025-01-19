import {
	CONTENT,
	LINK_CATEGORY,
	LINK_LIST,
	LINK_LIST_ITEM,
	LINK_TYPE,
	LINK_TOPIC,
	LINK_CONTROLS,
	EDIT_BUTTON,
	REMOVE_BUTTON
} from '../../classNames.js';


// linksData = []
export default class Category {
	constructor(category, linksData, removeLinkAction) {
		this.node = null;
		this.category = category;
		this.create(category, linksData);
		this.list = this.node.querySelector(`.${LINK_LIST}`);
		this.prevSelectedItem = null;
		this.node.addEventListener('click', (e) => {
			const target = e.target;
			if (target.classList.contains(`${REMOVE_BUTTON}`)) {
				const id = target.dataset.linkid;
				removeLinkAction(id);
			} else {
				this.selectListItem(e);
			}
		});
		this.prevHoveredItem = null;
		for (let listItem of this.list.children) {
			createHoverEffect()(listItem, (...args) => this.hoverListItem(...args));
		}
	}

	createTemplate(category, linksData) {
		let html = '';
		html += `<div class="${LINK_CATEGORY}" data-category="${category}">`;
			html += `<ul class="${LINK_LIST}" data-category="${category}">`;
				linksData.forEach(link => {
					html += `${this.createListItemTemplate(link.id, link.link, link.type, link.topic)}`;
				});
			html += '</ul>';
		html += '</div>';
		return html;
	}

	createListItemTemplate(id, linkSrc, linkType, linkDescription) {
		let html = '';
		html += `<li class="${LINK_LIST_ITEM}" data-linkid=${id}>`;
			html += '<h3>';
				html += `<span class="${LINK_TYPE}">${linkType}</span> `;
				html += `<a class="${LINK_TOPIC}" href=${linkSrc} target="_blank">${linkDescription}</a>`;
				html += `<div class="${LINK_CONTROLS} visibility sm">`;
					html += `<span><a class="link-btn ${EDIT_BUTTON}" data-linkid=${id}>&#128393;</a></span>`;
					html += `<span><a class="link-btn ${REMOVE_BUTTON}" data-linkid=${id}>&#128473;</a></span>`;
				html += '</div>';
			html += '</h3>';
		html += '</li>';
		return html;
	}

	arrange(type) {
		const items = Array.from(this.list.children).map(li => {
			const linkType = li.querySelector(`.${LINK_TYPE}`).textContent;
			return { type: linkType, element: li };
		});
		const newArrangedItems = items.sort((a, b) => {
			if (a.type === type) return -1;
				return 1;
			})
			.map(item => item.element);
		this.list.append(...newArrangedItems);
	}

	selectListItem(e) {
		const target = e.target.closest(`.${LINK_LIST_ITEM}`);
		if (target) {
			if (this.prevSelectedItem) {
				this.prevSelectedItem.classList.remove('current');
				this.prevSelectedItem.querySelector(`.${LINK_CONTROLS}`).classList.add('visibility');
			}
			target.classList.add('current');
			target.querySelector(`.${LINK_CONTROLS}`).classList.remove('visibility');
			this.prevSelectedItem = target;
		}
	}

	hoverListItem(item) {
		if (item && item === this.prevSelectedItem) return;
		const controls = item.querySelector(`.${LINK_CONTROLS}`);
		// in
		if (this.prevHoveredItem !== item) {
			controls.classList.remove('visibility');
			this.prevHoveredItem = item;
		// out
		} else {
			controls.classList.add('visibility');
			this.prevHoveredItem = null;
		}
	}

	create(category, linksData) {
		const container = document.querySelector(`.${CONTENT}`);
		container.insertAdjacentHTML('beforeend', this.createTemplate(category, linksData));
		this.node = document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`);
	}

	update(linkType, removedLinkId) {
		if (linkType) this.arrange(linkType);
		if (removedLinkId) {
			this.list.querySelector(`.${LINK_LIST_ITEM}[data-linkid="${removedLinkId}"]`).remove();
		}
		console.log(this.category, 'list updated!');
	}
}


function createHoverEffect() {
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