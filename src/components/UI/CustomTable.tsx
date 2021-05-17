import React from 'react';
import { Table, Thead, Tr, Th, Td, Tbody, IconButton, ChakraProps } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

type TableVariants = 'wallets' | 'transactions';

type CustomTableProps<T> = {
	tableData: T[];
	tableVariant: TableVariants;
};

type TableMapping = {
	[key in TableVariants]: {
		headers: Array<string>;
		values: Array<string>;
		styles?: ChakraProps;
	};
};

const getNestedObject = <NestedType,>(nestedObject: NestedType, pathArray: Array<any>): string => {
	return pathArray.reduce(
		(object, key) => (object && object[key] !== 'undefined' ? object[key] : undefined),
		nestedObject
	);
};

const getBorderColor = <TableData,>(tableVariant: TableVariants, tableValue: TableData) => {
	return tableVariant === 'transactions' &&
		getNestedObject(tableValue, ['transactionType', 'transactionTypeName']) === 'Debit'
		? 'red.400'
		: 'green.400';
};

const tableMapping: TableMapping = {
	wallets: {
		headers: ['Wallet Id', 'Wallet Name'],
		values: ['walletId', 'walletName'],
	},
	transactions: {
		styles: {
			borderLeftColor: 'red.400',
			borderLeftWidth: '5px',
			borderLeftStyle: 'solid',
		},
		headers: ['Id', 'Type', 'Date', 'Amount', 'Debited From', 'Credited To'],
		values: [
			'transactionId',
			'transactionType.transactionTypeName',
			'spentOn',
			'amount',
			'debitedFromWallet.walletName',
			'creditedToWallet.walletName',
		],
	},
};

export const CustomTable = <T,>(props: CustomTableProps<T>) => {
	const { tableData, tableVariant } = props;
	const { headers, values, styles } = tableMapping[tableVariant];

	return (
		<Table mt="30" variant="simple">
			<Thead>
				<Tr>
					{headers.map((header, index) => (
						<Th key={`HEADER_KEY_FOR_${tableVariant}_${index + 583 * 78922154789}`}>{header}</Th>
					))}
					{/* Edit Button */}
					<Th maxW="25"></Th>
					{/* Delete Button */}
					<Th maxW="25"></Th>
				</Tr>
			</Thead>
			<Tbody>
				{tableData.map((tableValue: T, index) => {
					const key = `KEY_TABLE_ROW_ID_${index * 55}`;
					const updatedStyles: ChakraProps = {
						...styles,
						borderLeftColor: getBorderColor<T>(tableVariant, tableValue),
					};
					return (
						<Tr {...updatedStyles} key={key}>
							{values.map((tableIdentifier: string) => {
								const splitValues = tableIdentifier.split('.');
								if (splitValues.length === 1) {
									return <Td>{tableValue[tableIdentifier as keyof T]}</Td>;
								}
								return <Td>{getNestedObject<T>(tableValue, splitValues)}</Td>;
							})}
							<Td p="0" textAlign="left" maxW="50">
								<IconButton
									aria-label="Edit Item"
									colorScheme="blue"
									icon={<EditIcon />}
									onClick={() => console.log('Edit the table field')}
								/>
							</Td>
							<Td p="0" textAlign="left" maxW="50">
								<IconButton
									aria-label="Delete Item"
									colorScheme="red"
									icon={<DeleteIcon />}
									onClick={() => console.log('Delete the table field')}
								/>
							</Td>
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
};
