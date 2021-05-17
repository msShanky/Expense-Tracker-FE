import React, { FunctionComponent } from 'react';
import * as yup from 'yup';
import { Box, FormControl, FormLabel, FormErrorMessage, Input, Button, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

const walletSchema = yup.object().shape({
	walletName: yup
		.string()
		.required('Wallet Name cannot be empty')
		.min(3, 'wallet name should be greater than 3 characters')
		.max(25, 'Wallet name cannot exceed 25 characters'),
});

type WalletFormProps = {
	formSubmit(values: WalletCreationForm): void;
	cancelForm(): void;
};

export const WalletCreationForm: FunctionComponent<WalletFormProps> = (props) => {
	const { handleSubmit, register, formState } = useForm<WalletCreationForm>({
		mode: 'onBlur',
		resolver: yupResolver(walletSchema),
	});

	const { errors, isDirty, isValid } = formState;
	const { cancelForm, formSubmit } = props;

	const handleFormSubmit = (values: WalletCreationForm) => {
		formSubmit(values);
	};

	return (
		<Box
			minH="200"
			mt="10"
			padding="10"
			as="form"
			onSubmit={handleSubmit(handleFormSubmit)}
			bg="blue.400"
			borderRadius="15"
		>
			{/* Input Field for Wallet Name */}
			<FormControl variant="filled" isRequired>
				<FormLabel>Wallet Name</FormLabel>
				<Input {...register('walletName')} type="text" />
				<FormErrorMessage>{errors.walletName?.message}</FormErrorMessage>
			</FormControl>
			<Flex mt="5" justifyContent="flex-end">
				<Button onClick={() => cancelForm()} leftIcon={<CloseIcon />} mr="5" variant="solid" colorScheme="red">
					Cancel
				</Button>
				<Button
					type="submit"
					disabled={!isDirty || !isValid}
					leftIcon={<AddIcon />}
					variant="solid"
					colorScheme="green"
				>
					Create
				</Button>
			</Flex>
		</Box>
	);
};
