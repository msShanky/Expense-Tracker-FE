import React, { ReactNode } from 'react';

import Head from 'next/head';
import { Header } from './UI/Header';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = 'Expense Tracker' }: Props) => (
	<>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<Header />
		{children}
	</>
);

export default Layout;
