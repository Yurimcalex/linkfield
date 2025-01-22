export function createOptionsTemplate(items) {
	let html = '';
	for (let item of items) {
		html += `<option value="${item}">${item}</option>`;
	}
	return html;
}