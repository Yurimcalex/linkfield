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

export const selectAllLinks = (state) => state.links.data;