import { createSlice } from '@reduxjs/toolkit';

const linksSlice = createSlice({
	name: 'links',

	initialState: {
		data: []
	},

	reducers: {
		
	}
});

export default linksSlice.reducer;

export const allLinksSelector = (state) => state.links.data;