const db = {
	links: null,

	createKey() {
		return `links-${localStorage.length + 1}`;
	},

	loadLinks() {
		return Object
			.keys(localStorage)
			.filter(key => key.startsWith('links'))
			.map(key => JSON.parse(localStorage.getItem(key)));
	},

	setLink(linkData) {
		const key = this.createKey();
		const data = { ...linkData, _id: key };
		localStorage.setItem(key, JSON.stringify(data));
	},

	removeLink(id) {
		localStorage.removeItem(id);
	},

	getLinks() {
		return this.links;
	},

	init() {
		this.links = this.loadLinks();
	}
};

db.init();


export default db;