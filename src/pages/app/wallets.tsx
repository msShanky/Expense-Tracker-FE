import React, { useState } from 'react';
import { Container, Text, Flex, Button } from '@chakra-ui/react';
// import { Table, Thead, Tr, Th, Td, Tbody, IconButton } from '@chakra-ui/react';
// import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { AddIcon } from '@chakra-ui/icons';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { validateCookieAndRedirect } from '../../utils/UserServerValidation';
import { WalletCreationForm } from '../../components/UI/WalletCreationForm';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createWallet, getWallets } from '../../store/action/WalletAction';
import { RootState } from '../../store';
import { CustomTable } from '../../components/UI/CustomTable';

const wallets = () => {
	const [shouldRenderWalletForm, setShouldRenderWalletForm] = useState<Boolean>(false);
	const dispatch = useDispatch();

	const { wallets } = useSelector((state: RootState) => state.wallet, shallowEqual);

	const handleWalletCreation = async (values: WalletCreationForm) => {
		const response = await dispatch(createWallet(values));
		// @ts-ignore
		if (createWallet.fulfilled.match(response)) {
			setShouldRenderWalletForm(false);
			dispatch(getWallets());
		}
	};

	useEffect(() => {
		dispatch(getWallets());
	}, []);

	return (
		<Layout title="Expense Tracker | Wallets">
			<Container mt="30" maxW="1200">
				<Flex alignItems="center" justifyContent="space-between">
					<Text fontSize="3xl">Wallets</Text>
					<Button onClick={() => setShouldRenderWalletForm(true)} leftIcon={<AddIcon />}>
						Add Wallet
					</Button>
				</Flex>
				{shouldRenderWalletForm && (
					<WalletCreationForm formSubmit={handleWalletCreation} cancelForm={() => setShouldRenderWalletForm(false)} />
				)}
				<CustomTable<Wallet> tableVariant="wallets" tableData={wallets} />
			</Container>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateCookieAndRedirect(context);
};

export default wallets;
