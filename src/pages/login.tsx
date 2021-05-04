import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import { Center, Text, Link, Input, Container, Spinner } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Flex, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginFormValues } from '../interfaces';
import * as yup from 'yup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/action/UserFetch';
import { AppDispatch, RootState } from '../store';
import { GetServerSideProps } from 'next';
import { fetchUserProfile } from '../utils/FetchUserProfile';

const schema = yup.object().shape({
	email: yup.string().email('Please enter a valid email'),
	password: yup.string().required('Please enter the password'),
});

const Login = (): ReactElement => {
	const router = useRouter();
	const { handleSubmit, register, formState } = useForm<LoginFormValues>({
		resolver: yupResolver(schema),
	});
	const dispatch: AppDispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user, shallowEqual);
	const { status } = userState;
	const { errors } = formState;

	const handleFormSubmit = async (data: LoginFormValues) => {
		const resultAction = await dispatch(loginUser(data));
		if (loginUser.fulfilled.match(resultAction)) {
			router.push('/app/dashboard');
		}
	};

	const checkFieldInvalidity = (fieldName: string): boolean => {
		return Object.prototype.hasOwnProperty.call(errors, fieldName);
	};

	return (
		<Layout hideHeader title="Expense Tracker | Login">
			<Center h="90vh" justifyContent="center" flexDirection="column">
				<Text fontSize="5xl" as="h1">
					Login
				</Text>
				<Text>
					Don't have an account?{' '}
					<NextLink href="/register" passHref>
						<Link color="blue.400">Register</Link>
					</NextLink>
				</Text>

				<Container mt={10} onSubmit={handleSubmit(handleFormSubmit)} as="form">
					{/* Email */}
					<FormControl mt={4} isInvalid={checkFieldInvalidity('email')} isRequired>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input type="email" autoComplete="off" placeholder="sample@emample.com" {...register('email')} />
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>

					{/* Password */}
					<FormControl mt={4} isInvalid={checkFieldInvalidity('password')} isRequired>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input type="password" placeholder="Password" {...register('password')} />
						<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
					</FormControl>

					{/* Submit Button */}
					<Flex mt={16} justifyContent="center">
						<Button
							background="blue.600"
							isLoading={status === 'pending'}
							spinner={<Spinner />}
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	// Get the token from the request cookies
	const { token } = req.cookies;
	// Check if the token is present if so then check if it's valid
	if (token) {
		try {
			await fetchUserProfile(token);
			// If the  token is valid then redirect the user to dashboard as they don't have any use with register page.
			res.writeHead(307, { location: '/app/dashboard' });
			res.end();
			return {
				props: {
					loggedIn: true,
				},
			};
		} catch (error) {
			console.log('The Error caught in Login page user validation is', error);
			// IF there is an error then don't redirect, the user has to register
			return {
				props: {
					loggedIn: false,
				},
			};
		}
	}

	return {
		props: {
			loggedIn: false,
		},
	};
};

export default Login;
