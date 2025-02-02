import { dom } from '../../elements.js';
import { createTemplate, createListItemTemplate } from './categoryTemplate.js';
import { createHoverEffect, isVisible } from '../../utils.js';


let prevHoveredItem = null;

export default class Category {
	constructor(category, linksData, removeLinkAction, openLinkFormAction) {
		this.category = category;
		this.create(category, linksData);
		this.node = dom.getCategory(category);
		this.list = dom.getLinkList(category); 
		this.createHover = createHoverEffect();

		this.node.addEventListener('click', (e) => {
			const target = e.target;
			const id = target.dataset.linkid;
			const link = dom.link.get(target);
			
			if (target === dom.link.getRemoveButton(target)) {
				removeLinkAction(id);
				this.hideLink(target);

			} else if (target === dom.link.getEditButton(target)) {
				openLinkFormAction(id);
				this.selectLink(link, dom.link.getCurrentSelected());
				this.currentId = id;

			} else {
				if (link) this.selectLink(link, dom.link.getCurrentSelected());
			}
		});

		for (let link of this.list.children) {
			this.createHover(link, (...args) => this.hoverLink(...args));
		}
	}

	// pure ui without the store affecting on the component visual state
	selectLink(link, prevLink) {
		if (prevLink) {
			prevLink.classList.remove('current');
			dom.link.getControls(prevLink).classList.add('visibility');
		}
		link.classList.add('current');
		dom.link.getControls(link).classList.remove('visibility');
	}

	hoverLink(link) {
		if (link.classList.contains('current')) return;
		const controls = dom.link.getControls(link);
		if (prevHoveredItem !== link) { // in
			controls.classList.remove('visibility');
			prevHoveredItem = link;
		} else { // out
			controls.classList.add('visibility');
			prevHoveredItem = null;
		}
	}

	highlightLink(link) {
		link.classList.add('highlight');
		setTimeout(() => {
			link.classList.remove('highlight');
		}, 2000);
	}

	focusLink(link) {
		this.selectLink(link, dom.link.getCurrentSelected());
		if (!isVisible(link)) link.scrollIntoView(false);
		this.highlightLink(link);
	}

	hideLink(target) {
		const link = dom.link.get(target);
		link.style.visibility = 'hidden';
	}

	showLink(link) {
		link.style.visibility = 'visible';
	}

	// type - stored in filters slice of the store
	arrangeLinksByType(type) {
		const items = Array.from(this.list.children)
			.map(link => ({ type: dom.link.getType(link).textContent, element: link }));
		const arrangedLinks = items
			.sort((a, b) => a.type === type ? -1 : 1)
			.map(item => item.element);
		this.list.append(...arrangedLinks);
	}

	// id - stored in links slice of the store
	removeLink(id) {
		const link = dom.link.getById(this.list, id);
		if (link) {
			const nextLink = link.nextElementSibling;
			if (nextLink) dom.link.getControls(nextLink).classList.remove('visibility');
			link.remove();
		}
	}

	// data comes from the links slice of the store
	createLink(data) {
		this.list.insertAdjacentHTML(
			'beforeend',
			createListItemTemplate(data._id, data.src, data.type, data.description)
		);
		const link = dom.link.getLast(this.list);
		this.createHover(link, (...args) => this.hoverLink(...args));
		this.focusLink(link);
	}

	// data comes from the links slice of the store
	updateLink(data) {
		const { _id, src, type, description, category } = data;
		const linkElement = dom.link.getById(document, _id);
		const linkType = dom.link.getType(linkElement);
		const linkTopic = dom.link.getTopic(linkElement);
		linkType.textContent = type;
		linkTopic.src = src;
		linkTopic.textContent = description;
		if (!this.list.contains(linkElement)) this.list.append(linkElement);
		this.showLink(linkElement);
		this.focusLink(linkElement);
	}


	create(category, linksData) {
		dom.getContent().insertAdjacentHTML('beforeend', createTemplate(category, linksData));
	}

	update(data) {
		if (data.linkType) this.arrangeLinksByType(data.linkType.type);
		if (data.removedLinkId) this.removeLink(data.removedLinkId);
		if (data.createdLinkData) this.createLink(data.createdLinkData);
		if (data.editedLinkData) this.updateLink(data.editedLinkData);
	}
}