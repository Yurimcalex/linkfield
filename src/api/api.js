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
	}
};


test();

async function test() {
	const result = await api.createLink({
		description: 'Some description',
		category: 'Some category',
		src: 'Some src',
		type: 'Some type'
	});

	console.log(result);
}

export default api;