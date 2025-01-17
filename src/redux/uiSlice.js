import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',

	initialState: {
		menuCategory: '', // selected menu category
		isMenuOpened: false, // on small screen assigns whether category menu is opened or isn't
	},

	reducers: {
		menuCategorySelected: (state, action) => {
			state.menuCategory = action.payload;
		},
		categoryMenuToggled: (state) => {
			state.isMenuOpened = !state.isMenuOpened;
		}
	}
});

export default uiSlice.reducer;


// actions
export const { menuCategorySelected, categoryMenuToggled } = uiSlice.actions;


// selectors
export const selectMenuCategory = (state) => state.ui.menuCategory;
export const selectMenuVisibility = (state) => state.ui.isMenuOpened;