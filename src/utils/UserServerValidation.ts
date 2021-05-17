import { GetServerSidePropsContext } from 'next';
import { fetchUserProfile } from './FetchUserProfile';

export const validateCookieAndRedirect = async (context: GetServerSidePropsContext) => {
	const { res, req } = context;
	// Get the token from cookies
	const { token } = req.cookies;
	console.log(token, 'The token fetched from cookies');

	// If there is no token found in header then redirect to login as the user is not logged in
	if (!token) {
		res.writeHead(307, { location: '/login' });
		res.end();
		return { props: {} };
	}
	// Call the API Only If there is token available on cookies
	// Fetch the user profile to check if the user token is valid
	try {
		const profileResponse = await fetchUserProfile(token);
		console.log(profileResponse, 'PROFILE RESPONSE ');
		return {
			props: {
				loggedIn: true,
			},
		};
	} catch (error) {
		console.log('There is an error in the API CALL', error.message);
		// If the user call fails redirect the user to /login page
		res.writeHead(307, { location: '/login' });
		res.end();
		return {
			props: {
				loggedIn: false,
			},
		};
	}
};
