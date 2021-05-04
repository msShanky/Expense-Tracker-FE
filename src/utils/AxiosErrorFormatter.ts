import { AxiosError } from 'axios';

export const formatApiErrors = (error: AxiosError): string => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.log(error.response.data, 'The User Data');
		console.log(error.response.status, 'The user reject status');
		console.log(error.response.headers, 'The User data headers');
		return error.response.data;
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.log(error.request);
		return error.request;
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message);
		return error.message;
	}
};
