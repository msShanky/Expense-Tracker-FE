import React, { FunctionComponent } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, StackDivider } from '@chakra-ui/react';
import { DrawerBody, Button } from '@chakra-ui/react';
import Link from 'next/link';

const menuItems = [
	{
		label: 'Home',
		link: '/app/dashboard',
	},
	{
		label: 'Wallets',
		link: '/app/wallets',
	},
	{
		label: 'Transaction',
		link: '/app/transaction',
	},
];

type SideBarProps = {
	toggleSideBar(): void;
	showSideBar: boolean;
};

export const SideBar: FunctionComponent<SideBarProps> = ({ showSideBar, toggleSideBar }) => {
	return (
		<Drawer isOpen={showSideBar} placement="left" onClose={() => toggleSideBar()}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerBody mt="75">
					<VStack
						alignItems="flex-start"
						textAlign="left"
						spacing="25px"
						divider={<StackDivider maxW="50" borderColor="whiteAlpha.700" />}
					>
						{menuItems.map((menuItem, index) => (
							<Link key={`SIDE_BAR_MENU_ITEM_${index * 45 + 7893215456}`} href={menuItem.link}>
								<Button onClick={() => toggleSideBar()} colorScheme="teal" variant="link">
									{menuItem.label}
								</Button>
							</Link>
						))}
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
