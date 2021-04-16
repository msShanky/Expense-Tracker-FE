import { default as NextLink } from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import { Center, Text, Link, Input, Container } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Flex, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginFormValues } from '../interfaces';
import * as yup from 'yup';

const schema = yup.object().shape({
	email: yup.string().email('Please enter a valid email'),
	password: yup.string().required('Please enter the password'),
});

const Login = (): ReactElement => {
	const { handleSubmit, register, formState } = useForm<LoginFormValues>({
		resolver: yupResolver(schema),
	});
	const { errors } = formState;

	const handleFormSubmit = (data: LoginFormValues) => {
		console.log('THE FORM VALUES', data);
	};

	const checkFieldInvalidity = (fieldName: string): boolean => {
		return Object.prototype.hasOwnProperty.call(errors, fieldName);
	};

	return (
		<Layout title="Expense Tracker | Login">
			<Center h="90vh" justifyContent="center" flexDirection="column">
				<Text fontSize="5xl" as="h1">
					Login
				</Text>
				<Text>
					Dont't have an account?{' '}
					<NextLink href="/signup" passHref>
						<Link color="blue.400">SignUp</Link>
					</NextLink>
				</Text>

				<Container mt={10} onSubmit={handleSubmit(handleFormSubmit)} as="form">
					{/* Email */}
					<FormControl
						mt={4}
						isInvalid={checkFieldInvalidity('email')}
						isRequired
					>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
							type="email"
							autocomplete="off"
							placeholder="sample@emample.com"
							{...register('email')}
						/>
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>

					{/* Password */}
					<FormControl
						mt={4}
						isInvalid={checkFieldInvalidity('password')}
						isRequired
					>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input
							type="password"
							placeholder="Password"
							{...register('password')}
						/>
						<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
					</FormControl>

					{/* Submit Button */}
					<Flex mt={16} justifyContent="center">
						<Button
							background="blue.600"
							isLoading={formState.isSubmitting}
							type="submit"
							w={'50%'}
						>
							Submit
						</Button>
					</Flex>
				</Container>
			</Center>
		</Layout>
	);
};

export default Login;
