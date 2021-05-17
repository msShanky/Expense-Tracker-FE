// import axios from 'axios';
// import { GetServerSideProps } from 'next';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { validateCookieAndRedirect } from '../../utils/UserServerValidation';
import { VStack, Text, Button, ChakraProps } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { default as NextLink } from 'next/link';

const styles: ChakraProps = {
	justifyContent: 'center',
	borderRadius: '15',
	textAlign: 'center',
	minH: '500',
	mt: '20',
	mx: '20',
	bg: 'blue.400',
};

// RESTRICTED PAGE
const Dashboard = () => {
	// console.log(props, 'THE PROPS RECEIVED FROM THE STATIC PROPS', props);
	const userState = useSelector((state: RootState) => state.user, shallowEqual);
	useEffect(() => {
		// TODO: Fetch the data for dashboard api
		// TODO: Check if the user has no data
	}, []);

	return (
		<Layout>
			<VStack spacing="20px" {...styles}>
				<Text fontSize="3xl" maxW="1200">
					Hi {userState.profile.firstName}, There is no data to be displayed. Please create a wallet to manage your
					expenses
				</Text>
				<NextLink href="/app/wallets" passHref>
					<Button leftIcon={<AddIcon />} variant="solid" _hover={{ bg: 'blackAlpha.700' }} bg="black">
						Add New Wallet
					</Button>
				</NextLink>
			</VStack>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateCookieAndRedirect(context);
};

export default Dashboard;
