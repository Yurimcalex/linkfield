


export function loadingComplete() {
	setTimeout(() => {
		document
			.querySelector('.loading-cover')
			.style.display = 'none';
		}, 0);
}