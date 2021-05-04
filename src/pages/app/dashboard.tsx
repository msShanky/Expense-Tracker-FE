// import axios from 'axios';
// import { GetServerSideProps } from 'next';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import { fetchUserProfile } from '../../utils/FetchUserProfile';

// RESTRICTED PAGE
const Dashboard = () => {
	return (
		<Layout>
			<h1>This is the dashboard page</h1>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	// Get the token from cookies
	const { token } = req.cookies;
	// If there is no token found in header then redirect to login as the user is not logged in
	if (!token) {
		res.writeHead(307, { location: '/login' });
		res.end();
		return { props: {} };
	}
	// Call the API Only If there is token available on cookies
	// Fetch the user profile to check if the user token is valid
	try {
		await fetchUserProfile(token);
		return {
			props: {
				loggedIn: true,
			},
		};
	} catch (error) {
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const { req } = context;
// 	const { token } = req.cookies;
// 	console.log(token, 'The request cookies from the server is');

// 	try {
// 		if (token) {
// 			const response = await axios.get(`http://localhost:8000/me`);
// 			console.log(response, 'The user has a valid token');
// 			return {
// 				props: {
// 					loggedIn: true,
// 				},
// 			};
// 		} else {
// 			return {
// 				props: {
// 					loggedIn: false,
// 				},
// 			};
// 		}
// 	} catch (error) {
// 		return {
// 			notFound: true,
// 			redirect: { destination: '/login', permanent: false },
// 		};
// 	}
// };

export default Dashboard;
