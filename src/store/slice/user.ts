import { createSlice } from '@reduxjs/toolkit';
import { loginUserAsyncActions, registerUserActions } from '../action/UserAction';
import initialState from '../initialState';

const userSlice = createSlice({
	name: 'user',
	initialState: initialState.user,
	reducers: {},
	extraReducers: (builder) => {
		loginUserAsyncActions(builder);
		registerUserActions(builder);
	},
});

export default userSlice.reducer;
