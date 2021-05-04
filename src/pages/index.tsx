import { default as NextLink } from 'next/link';
import { Link } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
// import { getCookie } from '../utils/CookieHandler';
import Cookies from 'js-cookie';

const IndexPage = () => {
	const [isLoggedIn, setLoggedInState] = useState<boolean>(false);

	useEffect(() => {
		setLoggedInState(Cookies.get('token') ? true : false);
	}, []);

	return (
		<Layout hideHeader title="Expense Tracker Home">
			<h1>Application landing page</h1>
			<p>
				To explore more please login and give it a try!!
				<NextLink href={isLoggedIn ? '/app/dashboard' : '/login'} passHref>
					<Link color="blue.400">{isLoggedIn ? 'Dashboard' : 'Login'}</Link>
				</NextLink>
			</p>
		</Layout>
	);
};

export default IndexPage;
