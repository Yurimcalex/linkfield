import { 
	EDIT_BUTTON,
	LINK_LIST_ITEM,
	LINK_LIST,
	elements
} from '../../elements.js';
import { replaceSpace } from '../../utils.js';

const { openSettingsButton: openBtn, settingsWindow, linkForm: form, content } = elements;

export let editableItem = {};


export function handleLinkFormOpen() {
	openBtn.addEventListener('click', () => {
		openSettingsWindow();
		resetAddLinkForm();
		form.edit.classList.add('hide');
		form.add.classList.remove('hide');
	});


	content.addEventListener('click', (e) => {
		const target = e.target;
		
		if (target.classList.contains(`${EDIT_BUTTON}`)) {
			const linkItem = target.closest(`.${LINK_LIST_ITEM}`);

			openSettingsWindow();
			resetAddLinkForm();
			form.edit.classList.remove('hide');
			form.add.classList.add('hide');

			editableItem = { ...getLinkItemInfo(linkItem) };
			putDataIntoForm(linkItem, editableItem.list);
		}
	});
}


function openSettingsWindow() {
	settingsWindow.classList.remove('hide');
}


function resetAddLinkForm() {
	form.link.value = '';
	form.topic.value = '';
}


function getLinkItemInfo(linkItem) {
	const list = linkItem.closest(`.${LINK_LIST}`);
	return {
		linkItem,
		list,
		category: list.dataset.category,
		position:  Array.from(list.children).indexOf(linkItem)
	};
}


function putDataIntoForm(linkItem, linkList) {
	const linkType = elements.select(linkItem, 'linkType');
	const linkTopic = elements.select(linkItem, 'linkTopic');

	form.link.value = linkTopic.getAttribute('href');
	form.topic.value = linkTopic.textContent;
	form.type.value = replaceSpace(linkType.textContent);
	form.category.value = linkList.dataset.category;
}