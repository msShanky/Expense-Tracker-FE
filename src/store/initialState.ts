const userState: UserState = {
	error: null,
	loginTime: '',
	sessionExpiry: '',
	status: 'idle',
	token: '',
	userImage: '',
	profile: {
		emailVerified: false,
		firstName: '',
		lastLogin: '',
		lastName: '',
		userName: '',
	},
};

export default {
	user: userState,
};
