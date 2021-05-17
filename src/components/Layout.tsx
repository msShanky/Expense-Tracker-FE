import React, { ReactNode } from 'react';

import Head from 'next/head';
import { Header } from './UI/Header';
import { SideBar } from './UI/SideBar';
import { RootState } from '../store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../store/slice/Global';

type Props = {
	children?: ReactNode;
	title?: string;
	hideHeader?: boolean;
};

const Layout = ({ children, title = 'Expense Tracker', hideHeader = false }: Props) => {
	const dispatch = useDispatch();
	const { displaySideBar } = useSelector((state: RootState) => state.global, shallowEqual);
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header isLoggedIn={hideHeader} />
			<SideBar toggleSideBar={() => dispatch(toggleSideBar())} showSideBar={displaySideBar} />
			{children}
		</>
	);
};

export default Layout;
