const content = document.querySelector('.content');

export function handleLinkRemove() {
	content.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('remove-btn')) {
			target.closest('li').remove();
		}
	});
}