import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',

	initialState: {
		menuCategory: '', // selected menu category
		isMenuOpened: false, // on small screen assigns whether category menu is opened or isn't
		isSmallScreen: false,
	},

	reducers: {
		menuCategorySelected: (state, action) => {
			state.menuCategory = action.payload;
		},
		categoryMenuToggled: (state) => {
			state.isMenuOpened = !state.isMenuOpened;
		},
		screenSizeChanged: (state, action) => {
			state.isSmallScreen = action.payload;
		},
	}
});

export default uiSlice.reducer;


// actions
export const { menuCategorySelected, categoryMenuToggled, screenSizeChanged } = uiSlice.actions;


// selectors
export const selectMenuCategory = (state) => state.ui.menuCategory;
export const selectMenuVisibility = (state) => state.ui.isMenuOpened;
export const selectIsSmallScreen = (state) => state.ui.isSmallScreen;