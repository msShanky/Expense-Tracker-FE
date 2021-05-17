const defaultState: BasicApiTemplate<ServerApiError['error']> = {
	error: {
		message: '',
		name: '',
		statusCode: 0,
	},
	status: 'idle',
};

const userState: UserState = {
	...defaultState,
	profile: {
		id: '',
		token: '',
		emailVerified: false,
		email: '',
		firstName: '',
		lastName: '',
		userName: '',
		lastLogin: '',
	},
};

const walletState: WalletState = {
	...defaultState,
	wallets: [],
};

const transactionState: TransactionState = {
	...defaultState,
	transactions: [],
};

const globalState: GlobalState = {
	displaySideBar: false,
	// TODO: Convert this to an API call
	transactionType: [
		{ transactionTypeId: 1, transactionTypeName: 'Credit' },
		{ transactionTypeId: 2, transactionTypeName: 'Debit' },
	],
};

export default {
	user: userState,
	wallets: walletState,
	global: globalState,
	transaction: transactionState,
};
