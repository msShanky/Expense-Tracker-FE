import React, { ReactNode } from 'react';

import Head from 'next/head';
import { Header } from './UI/Header';

type Props = {
	children?: ReactNode;
	title?: string;
	hideHeader?: boolean;
};

const Layout = ({ children, title = 'Expense Tracker', hideHeader = false }: Props) => (
	<>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<Header isLoggedIn={hideHeader} />
		{children}
	</>
);

export default Layout;
