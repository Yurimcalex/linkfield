import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',

	initialState: {
		menuCategory: '', // selected menu category
	},

	reducers: {
		
	}
});

export default uiSlice.reducer;


export const selectMenuCategory = (state) => state.ui.menuCategory;