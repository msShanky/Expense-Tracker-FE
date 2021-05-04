export const setCookie = (identifier: string, value: string): void => {
	if (typeof document !== 'undefined') {
		const expiry = new Date();
		expiry.setMinutes(expiry.getMinutes() + 60);
		document.cookie = `${identifier}=${value}; domain: localhost; expires=${expiry.toUTCString()}`;
	}
};

export const getCookie = (identifier: string): string | undefined => {
	if (typeof document === 'undefined') {
		return undefined;
	}
	const cookieValue = document.cookie
		.split('; ')
		.find((row) => row.startsWith(`${identifier}=`))
		?.split('=')[1];

	return cookieValue ?? '';
};

export const clearCookie = () => {
	if (typeof document === 'undefined') {
		return;
	}

	document.cookie = `token=;domain: localhost; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

export const setSessionToken = (identifier: string, value: string) => {
	if (typeof window !== 'undefined') {
		return;
	}
	sessionStorage.setItem(identifier, value);
};

export const getSessionToken = (identifier: string) => {
	if (typeof window !== 'undefined') {
		return;
	}

	return sessionStorage.getItem(identifier);
};

export const removeSessionToken = (identifier: string) => {
	if (typeof window !== 'undefined') {
		return;
	}
	sessionStorage.removeItem(identifier);
};
