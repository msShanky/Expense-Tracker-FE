import { Container, Flex, Text, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { validateCookieAndRedirect } from '../../utils/UserServerValidation';
import { useEffect } from 'react';
import { createTransaction, getTransactions } from '../../store/action/TransactionAction';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CustomTable, TransactionForm } from '../../components/UI';
import { getWallets } from '../../store/action/WalletAction';

const Transaction = () => {
	const [shouldRenderForm, setShouldRenderForm] = useState<Boolean>(false);
	const dispatch = useDispatch();
	const { transactions, status } = useSelector((state: RootState) => state.transaction, shallowEqual);
	const { wallets } = useSelector((state: RootState) => state.wallet, shallowEqual);

	useEffect(() => {
		if (wallets.length <= 0) {
			dispatch(getWallets());
		}
		dispatch(getTransactions());
	}, []);

	const handleTransactionSubmit = async (values: TransactionForm) => {
		const result = await dispatch(createTransaction(values));
		// @ts-ignore
		if (createTransaction.fulfilled.match(result)) {
			setShouldRenderForm(false);
			dispatch(getTransactions());
		}
	};

	return (
		<Layout>
			<Container mt="30" maxW="1200">
				<Flex mb="50" alignItems="center" justifyContent="space-between">
					<Text fontSize="3xl">Transactions</Text>
					<Button onClick={() => setShouldRenderForm(true)} leftIcon={<AddIcon />}>
						Add Transaction
					</Button>
				</Flex>
				{shouldRenderForm && (
					<TransactionForm
						wallets={wallets}
						onSubmit={handleTransactionSubmit}
						onCancel={() => setShouldRenderForm(false)}
					/>
				)}
				<CustomTable tableData={transactions} tableVariant="transactions" />
			</Container>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateCookieAndRedirect(context);
};

export default Transaction;
