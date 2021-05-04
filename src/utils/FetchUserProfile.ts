import axios from 'axios';

const apiURL = process.env.API_URL || 'http://localhost:8000';

export const fetchUserProfile = (token: string) => {
	return axios.get(apiURL, {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	});
};
