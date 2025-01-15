export function createCategoryOptions(categories) {
	let html = '';
	for (let category of categories) {
		html += `<option value="${category}">${category}</option>`
	}
	return html;
}