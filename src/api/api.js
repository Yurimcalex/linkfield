const baseUrl = 'http://localhost:5050';

const api = {
	loadLinks: async () => {
		let result = await fetch(`${baseUrl}/links`);
		return await result.json();
	}
};


test();

async function test() {
	const result = await api.loadLinks();
	console.log(result);
}

export default api;