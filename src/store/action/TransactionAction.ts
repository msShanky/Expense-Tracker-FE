import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatApiErrors } from '../../utils/AxiosErrorFormatter';
// import { BaseAsyncActionFactory } from '../../utils/ReduxAsyncAction';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const createTransaction = createAsyncThunk<Transaction, TransactionForm, ApiErrorType>(
	'transactions/create',
	async (transactionBody, thunkApi) => {
		try {
			const response = await axios.post(`${apiURL}/user-transactions`, transactionBody);
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ ...formatApiErrors(error) });
		}
	}
);

export const getTransactions = createAsyncThunk<Array<TransactionWithRelations>, void, ApiErrorType>(
	'transactions/get',
	async (_, thunkApi) => {
		try {
			const response = await axios.get(`${apiURL}/user-transactions`);
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ ...formatApiErrors(error) });
		}
	}
);

export const getTransactionAsyncActions = (builder: ActionReducerMapBuilder<TransactionState>) => {
	builder.addCase(getTransactions.pending, (state) => {
		state.status = 'pending';
	});
	builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
		state.transactions = payload;
		state.status = 'succeeded';
	});
	builder.addCase(getTransactions.rejected, (state, action) => {
		// console.log('The error case for api assignment is', action.payload);
		// console.log('the error from action is', action.error);
		if (action.payload) {
			console.log('THERE IS PAYLOAD FOR THE ERROR', action.payload.error);
			state.error = action.payload.error;
			state.status = 'failed';
		} else {
			// state.error = action.error?.message ?? JSON.stringify(action.error);
			state.error = {
				message: action.error.message as string,
				name: action.error.name as string,
				statusCode: parseInt(action.error.code as string, 10),
			};
			state.status = 'failed';
		}
	});
};

export const createTransactionAsyncActions = (builder: ActionReducerMapBuilder<TransactionState>) => {
	builder.addCase(createTransaction.pending, (state) => {
		state.status = 'pending';
	});
	builder.addCase(createTransaction.fulfilled, (state) => {
		state.status = 'succeeded';
	});
	builder.addCase(createTransaction.rejected, (state, action) => {
		// console.log('The error case for api assignment is', action.payload);
		// console.log('the error from action is', action.error);
		if (action.payload) {
			console.log('THERE IS PAYLOAD FOR THE ERROR', action.payload.error);
			state.error = action.payload.error;
			state.status = 'failed';
		} else {
			// state.error = action.error?.message ?? JSON.stringify(action.error);
			state.error = {
				message: action.error.message as string,
				name: action.error.name as string,
				statusCode: parseInt(action.error.code as string, 10),
			};
			state.status = 'failed';
		}
	});
};
