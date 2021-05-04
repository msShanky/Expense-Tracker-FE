import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import axios, { AxiosRequestConfig } from 'axios';
import { Provider } from 'react-redux';
import { store } from '../store';
import { getCookie } from '../utils/CookieHandler';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
	(config): AxiosRequestConfig => {
		const { origin } = new URL(config.url ?? '');
		const allowedOrigins = [apiURL];
		const token = getCookie('token');

		if (allowedOrigins.includes(origin)) {
			if (!token) {
				return config;
			}
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
