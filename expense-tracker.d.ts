declare namespace expenseTracker {}

declare type APIState = 'idle' | 'pending' | 'succeeded' | 'failed';

declare type UserProfile = {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	emailVerified: false;
	lastLogin: string;
	token: string;
};

declare type LoginResponse = UserProfile;

declare type RegistrationResponse = UserProfile;

declare type BasicApiTemplate<ErrorType> = {
	error: ErrorType;
	status: APIState;
};

// Define the type for errorMessage with generic type so that this is re-usable
declare type AsyncApiError<T> = {
	errorMessage: T;
};

declare type ServerApiError = {
	error: {
		statusCode: number;
		name: string;
		message: string;
		code?: string;
	};
};

declare interface UserProfile {
	userName: string;
	firstName: string;
	lastName: string;
	lastLogin: string;
}

declare interface UserState extends BasicApiTemplate<ServerApiError['error']> {
	profile: UserProfile;
}

declare interface WalletState extends BasicApiTemplate<ServerApiError['error']> {
	wallets: Array<Wallet>;
}

declare interface TransactionState extends BasicApiTemplate<ServerApiError['error']> {
	transactions: Array<TransactionWithRelations>;
}

declare interface GlobalState {
	displaySideBar: boolean;
	transactionType: TransactionType[];
}

declare type User = {
	id: number;
	name: string;
};

declare type RegisterFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	userName: string;
	password: string;
};

declare type LoginFormValues = {
	email: string;
	password: string;
};

declare type ApiErrorType = {
	rejectValue: ServerApiError;
};

declare type WalletCreationForm = {
	walletName: string;
};

declare type Wallet = {
	walletId: number;
	walletName: string;
	userId: string;
};

declare type WalletFormValues = {
	walletName: string;
};

declare type TransactionType = {
	transactionTypeName: string;
	transactionTypeId: number;
};

declare type Transaction = {
	transactionId: number;
	transactionTypeId: number;
	// The date of the transaction
	spentOn: string;
	// The location where the transaction look place
	spentAt?: string;
	userId: string;
	amount: number;
	creditedTo: number;
	debitedFrom: number;
};

declare type TransactionForm = Omit<Transaction, 'transactionId' | 'userId'>;

declare type TransactionWithRelations = Transaction & {
	creditedToWallet: Wallet;
	debitedFromWallet: Wallet;
	transactionType: TransactionType;
};

declare type CustomTableTypes = Wallet | TransactionWithRelations;

declare type TransactionType = 'Debit' | 'Credit';
