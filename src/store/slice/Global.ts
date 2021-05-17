import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

const globalSlice = createSlice({
	name: 'global',
	initialState: initialState.global,
	reducers: {
		toggleSideBar: (state) => {
			state.displaySideBar = !state.displaySideBar;
		},
	},
});

export const { toggleSideBar } = globalSlice.actions;

export default globalSlice.reducer;
