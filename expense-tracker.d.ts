declare type APIState = 'idle' | 'pending' | 'succeeded' | 'failed';

declare type LoginResponse = {
	message: string;
	token: string;
};

declare type BasicApiTemplate = {
	error: string | null;
	status: APIState;
};

declare type AsyncApiError = {
	errorMessage: string;
};

declare interface UserProfile {
	userName: string;
	firstName: string;
	lastName: string;
	emailVerified: boolean;
	lastLogin: string;
}

declare interface UserState extends BasicApiTemplate {
	token: string;
	loginTime: string;
	sessionExpiry: string;
	userImage: string;
	profile: UserProfile;
}
