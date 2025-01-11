import { 
	EDIT_BUTTON,
	LINK_LIST_ITEM,
	LINK_LIST,
	elements
} from '../../elements.js';
import { getFormData } from './displayCreatedLink.js';
import { replaceSpace } from '../../utils.js';

const { openSettingsButton: openBtn, linkForm: form, content } = elements;


export function handleLinkEdit() {
	content.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains(`${EDIT_BUTTON}`)) {
			editData( target.closest(`.${LINK_LIST_ITEM}`) );
		}
	});
}


// When the category has changed it needs to scroll to that category.
// When it hasnt changed it needs to replace the target link by new one.
// There is no way to get new just created link before add btn clicking of the form
// so the info about that link is able to catch with another handler.
// Because of the link list uses innerHTML to create its content
// there will be three versions of target link item:
// 1) the one in the old list content
// 2) the one in the new list content
// 3) and current edited one - this is the case
function editData(linkItem) {
	const { list, position, category } = getLinkInfo(linkItem);
		
		openBtn.click();
		putDataIntoForm(linkItem, list);
		changeFormButtonText('Edit');
		
		form.add.addEventListener('click', function interceptAddBtnclick() {
			const { category: newCategory } = getFormData(form);
			const oldLink = list.children[position];
			
			if (category === newCategory) {
				replaceLinkWithEditedOne(list, position);
			} else {
				focusOnLink(newCategory);
			}
			oldLink.remove();
			changeFormButtonText('Add');
			
			form.add.removeEventListener('click', interceptAddBtnclick);
		});
	
}


function getLinkInfo(linkItem) {
	const list = linkItem.closest(`.${LINK_LIST}`);
	return {
		linkItem: linkItem,
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


function changeFormButtonText(newText) {
	form.add.textContent = newText;
}


function replaceLinkWithEditedOne(linkList, linkInd) {
	const oldLink = linkList.children[linkInd];
	const newLink = elements.select(linkList, 'lastListItem');
	oldLink.after(newLink);
	newLink.click();
}


export function focusOnLink(category) {
	const listItems = elements.select(content, 'linkList', category).children;
	const link = listItems[listItems.length - 1];

	if (!isVisible(link)) {
		link.scrollIntoView(false);
	}
	
	link.click();
	highlightLinkForTime(link);
}

function isVisible(link) {
	const { top, height } = link.getBoundingClientRect();
	return top > 0 && top < window.innerHeight - height;
}

function highlightLinkForTime(linkItem) {
	linkItem.classList.add('highlight');
	setTimeout(() => {
		linkItem.classList.remove('highlight');
	}, 2000);
}