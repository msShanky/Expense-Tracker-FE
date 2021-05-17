import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { chakra, IconButton, Grid, Avatar, Button, HStack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSideBar } from '../../store/slice/Global';

const CustomStyledLink = chakra(Link);

interface HeaderProps {
	isLoggedIn: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({ isLoggedIn }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [redirectToApp, shouldRedirectToApp] = useState<boolean>(router.pathname.includes('app'));

	const handleLogout = () => {
		Cookies.remove('token');
		router.push('/');
	};

	useEffect(() => {
		shouldRedirectToApp(router.pathname.includes('app'));
	}, [router]);

	return (
		<header>
			<Grid alignItems="center" templateColumns="5% 30% 63.3%" w="100%" h={16} bg="blue.300" as="nav" gap={4}>
				<IconButton
					onClick={() => dispatch(toggleSideBar())}
					bg="transparent"
					aria-label="hamburger-menu"
					icon={<HamburgerIcon />}
				/>
				<CustomStyledLink sx={{ userSelect: 'none' }} href={redirectToApp ? '/app/dashboard' : '/'}>
					Expense Tracker
				</CustomStyledLink>
				{!isLoggedIn && (
					<HStack spacing="24px" alignItems="center" paddingRight="5" justifyContent="flex-end">
						<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
						<Button colorScheme="red" onClick={handleLogout}>
							Logout
						</Button>
					</HStack>
				)}
			</Grid>
		</header>
	);
};
