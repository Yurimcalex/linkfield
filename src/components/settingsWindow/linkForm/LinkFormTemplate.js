export function createOptionsTemplate(items, type) {
	let html = '';
	html += `<option value="default">Select ${type}</option>`
	for (let item of items) {
		html += `<option value="${item}">${item}</option>`;
	}
	html += `<option value="own">your own...</option>`
	return html;
}