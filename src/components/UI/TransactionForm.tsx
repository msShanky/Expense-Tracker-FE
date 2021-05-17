import React from 'react';
import { Box, ChakraProps, HStack, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { Select, Switch, Badge, Flex, Button, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { NumberInput, NumberInputField } from '@chakra-ui/react';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from './DatePicker';

type TransactionProps = {
	wallets: Wallet[];
	onSubmit(values: TransactionForm): void;
	onCancel(): void;
};

const styleProps: ChakraProps = {
	minH: '200',
	mt: '10',
	padding: '10',
	bg: 'blue.400',
	borderRadius: '15',
};

const schema = yup.object().shape({
	amount: yup.number().required('Please enter the amount').moreThan(0, 'The amount should be greater than 0'),
	creditedTo: yup.number().required('Credited to should not be empty'),
	debitedFrom: yup.number().required('Credited to should not be empty'),
	spentAt: yup.string(),
	spentOn: yup.date().required('Spent On is required'),
	transactionTypeId: yup.number().required('Transaction type is required'),
});

export const TransactionForm = (props: TransactionProps) => {
	const { register, formState, setValue, watch, handleSubmit } = useForm<TransactionForm>({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues: {
			transactionTypeId: 2,
		},
	});
	const { errors } = formState;
	// Default transaction type would be debit/expense
	const watchTransactionType = watch('transactionTypeId', 2);
	const watchDateValue = watch('spentOn', new Date().toISOString());
	const { wallets, onCancel, onSubmit } = props;

	console.log(errors, 'The errors received from the form');

	return (
		<Box as="form" onSubmit={handleSubmit(onSubmit)} {...styleProps}>
			<HStack mb="5" spacing="5">
				{/* Transaction Description */}
				<FormControl variant="filled" isRequired>
					<FormLabel>Spent At</FormLabel>
					<Input {...register('spentAt')} type="text" />
					<FormErrorMessage>{errors.spentAt?.message}</FormErrorMessage>
				</FormControl>

				<FormControl variant="filled" isRequired>
					<FormLabel>Transaction Type</FormLabel>
					<Switch
						onChange={({ target }) => {
							setValue('transactionTypeId', target.checked ? 1 : 2);
						}}
						onBlur={({ target }) => {
							setValue('transactionTypeId', target.checked ? 1 : 2);
						}}
						id="transaction-type-id"
					/>
					<Badge
						borderRadius={10}
						letterSpacing="wider"
						bg={watchTransactionType === 1 ? 'green.400' : 'red.400'}
						ml="5"
						paddingX="5"
						paddingY="2"
					>
						{watchTransactionType === 1 ? 'Income' : 'Expense'}
					</Badge>
					<FormErrorMessage>{errors.transactionTypeId?.message}</FormErrorMessage>
				</FormControl>
			</HStack>

			<HStack alignItems="flex-start" spacing="5">
				{/* Amount */}
				<FormControl mb="5" variant="filled" isRequired>
					<FormLabel>Amount</FormLabel>
					<InputGroup>
						<InputLeftAddon children={'Rs.'} />
						<NumberInput precision={2} onChange={(_, numericValue) => setValue('amount', numericValue)}>
							<NumberInputField />
						</NumberInput>
					</InputGroup>
					<FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="published-date">Transaction Date</FormLabel>
					<DatePicker
						selectedDate={watchDateValue ? new Date(watchDateValue) : new Date()}
						id="published-date"
						onChange={(d) => setValue('spentOn', new Date(d as Date).toISOString())}
						showPopperArrow={true}
					/>
				</FormControl>
			</HStack>

			<HStack spacing="5">
				<FormControl variant="filled" isRequired>
					<FormLabel>Credited To</FormLabel>
					<Select {...register('creditedTo')} variant="filled" placeholder="Select option">
						{wallets.map(({ walletId, walletName }, index) => {
							return (
								<option key={`CREDITED_TO_KEY_${index + 10 * 45678}`} value={walletId}>
									{walletName}
								</option>
							);
						})}
					</Select>
					<FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
				</FormControl>

				<FormControl variant="filled" isRequired>
					<FormLabel>Debited From</FormLabel>
					<Select {...register('debitedFrom')} variant="filled" placeholder="Select option">
						{wallets.map(({ walletId, walletName }, index) => {
							return (
								<option key={`CREDITED_TO_KEY_${index + 20 * 45678}`} value={walletId}>
									{walletName}
								</option>
							);
						})}
					</Select>
					<FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
				</FormControl>
			</HStack>
			<Flex mt="5" justifyContent="flex-end">
				<Button onClick={() => onCancel()} leftIcon={<CloseIcon />} mr="5" variant="solid" colorScheme="red">
					Cancel
				</Button>
				<Button type="submit" leftIcon={<AddIcon />} variant="solid" colorScheme="green">
					Create
				</Button>
			</Flex>
		</Box>
	);
};
