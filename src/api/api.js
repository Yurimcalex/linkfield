const baseUrl = 'http://localhost:5050';

const api = {
	loadLinks: async () => {
		let result = await fetch(`${baseUrl}/links`);
		return await result.json();
	},

	createLink: async (linkData) => {
		const response = await fetch(`${baseUrl}/links`, {
			method: 'POST',
			headers: {
			  "content-type": "application/json"
			},
			body: JSON.stringify(linkData)
		});
		const result = await response.json();
		return { ...linkData, _id: result.insertedId };
	},

	updateLink: async (id, updatedData) => {
		const response = await fetch(`${baseUrl}/links/${id}`, {
			method: 'PATCH',
			headers: {
			  "content-type": "application/json"
			},
			body: JSON.stringify(updatedData)
		});
		const result = await response.json();
		return { ...updatedData, _id: id };
	}
};


test();

async function test() {
	// const result = await api.updateLink('679d10d42aa0d1b5c23f6801', {
	// 	description: 'new description',
	// 	category: 'new category',
	// 	src: 'new src',
	// 	type: 'new type'
	// });

	// console.log(result);
}

export default api;