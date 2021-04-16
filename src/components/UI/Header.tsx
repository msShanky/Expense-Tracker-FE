import React from 'react';
import Link from 'next/link';
import { chakra, IconButton, Flex, Grid, Avatar } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const CustomStyledLink = chakra(Link);

export const Header = () => {
	return (
		<header>
			<Grid
				alignItems="center"
				templateColumns="5% 30% 63.3%"
				w="100%"
				h={16}
				bg="blue.300"
				as="nav"
				gap={4}
			>
				<IconButton
					bg="transparent"
					aria-label="hamburger-menu"
					icon={<HamburgerIcon />}
				/>
				<CustomStyledLink sx={{ userSelect: 'none' }} href="/">
					Expense Tracker
				</CustomStyledLink>
				<Flex paddingRight="5" justifyContent="flex-end">
					<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
				</Flex>
			</Grid>
		</header>
	);
};
