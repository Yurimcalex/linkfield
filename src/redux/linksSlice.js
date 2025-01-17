import { createSlice } from '@reduxjs/toolkit';

const linksSlice = createSlice({
	name: 'links',

	initialState: {
		data: [
			{
				category: "HTML & CSS",
				link: "https://www.joshwcomeau.com/css/transforms/",
				topic: "The World of CSS Transforms",
				type: "guide"
			}
		]
	},

	reducers: {
		
	}
});

export default linksSlice.reducer;


// selectors
export const selectAllLinks = (state) => state.links.data;

export const selectAllLinksId = (state) => state.links.data.map(d => d.id);

export const selectCategoryData = (state) => {
	let result = [];
	const data = {};
	state.links.data.forEach(({ category }) => {
		if (!(category in data)) {
			data[category] = 1;
		} else {
			data[category] += 1;
		}
	});
	for (let item in data) {
		result.push({ category: item, total: data[item] });
	}
	return result;
};

export const selectCategoryNames = (state) => 
	Array.from(
		new Set(
			state.links.data.map(d => d.category)
		)
	);