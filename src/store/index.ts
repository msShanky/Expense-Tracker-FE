import { configureStore } from '@reduxjs/toolkit';
import { userSlice, walletSlice, globalSlice, transactionSlice } from './slice';
import { createLogger } from 'redux-logger';
import { useDispatch } from 'react-redux';

const logger = createLogger({
	diff: true,
	collapsed: true,
});

export const store = configureStore({
	reducer: {
		user: userSlice,
		wallet: walletSlice,
		global: globalSlice,
		transaction: transactionSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
