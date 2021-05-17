import { createSlice } from '@reduxjs/toolkit';
import { createTransactionAsyncActions, getTransactionAsyncActions } from '../action/TransactionAction';
import initialState from '../initialState';

const transactionSlice = createSlice({
	name: 'transaction',
	initialState: initialState.transaction || {},
	reducers: {},
	extraReducers: (builder) => {
		getTransactionAsyncActions(builder);
		createTransactionAsyncActions(builder);
	},
});

export default transactionSlice.reducer;
