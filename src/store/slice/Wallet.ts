import { createSlice } from '@reduxjs/toolkit';
import { getWalletAsyncActions } from '../action/WalletAction';
import initialState from '../initialState';

const walletSlice = createSlice({
	name: 'wallets',
	initialState: initialState.wallets,
	reducers: {},
	extraReducers: (builder) => {
		getWalletAsyncActions(builder);
	},
});

export default walletSlice.reducer;
