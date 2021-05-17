import { default as NextLink } from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Center, Flex, Text, Link, Container, Button, Spinner } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { UnorderedList, Input, ListItem } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertDescription, IconButton } from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GetServerSideProps } from 'next';
import { fetchUserProfile } from '../utils/FetchUserProfile';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/action/UserAction';
import { useRouter } from 'next/router';
import { RootState } from '../store';

const schema = yup.object().shape({
	firstName: yup
		.string()
		.required('First Name is required')
		.min(3, 'First Name should be greater than 3 characters')
		.max(25, 'First Name should be less than 25 characters'),
	lastName: yup
		.string()
		.min(3, 'Last name should be greater than 3 characters')
		.max(20, 'Last Name should be less than 20 characters'),
	userName: yup
		.string()
		.min(3, 'User Name should be between 3 to 12 characters')
		.max(12, 'User Name should be between 3 to 12 characters'),
	email: yup.string().email(),
	password: yup
		.string()
		.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `PASSWORD_SUGGESTION`),
});

const Register = (): ReactElement => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const { handleSubmit, register, formState } = useForm<RegisterFormValues>({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});
	const { errors, isValid, isDirty } = formState;
	const userState = useSelector((state: RootState) => state.user, shallowEqual);

	useEffect(() => {
		router.prefetch('/app/dashboard');
	}, []);

	const { error: apiError, status } = userState;

	const isFieldHasAnError = (fieldName: string) => {
		return Object.prototype.hasOwnProperty.call(errors, fieldName);
	};

	// The function would dispatch registration and the API call would be triggered
	const handleFormSubmit = async (data: RegisterFormValues) => {
		const resultAction = await dispatch(registerUser(data));
		// @ts-ignore
		if (registerUser.fulfilled.match(resultAction)) {
			router.push('/app/dashboard');
		}
	};

	return (
		<Layout hideHeader title="Expense Tracker | Sign Up">
			<Center h="90vh" justifyContent="center" flexDirection="column">
				<Text fontSize="5xl" as="h1">
					Sign Up
				</Text>
				<Text>
					Already have an account?{' '}
					<NextLink href="/login" passHref>
						<Link color="blue.400">Login</Link>
					</NextLink>
				</Text>
				{/* FORM Container */}
				<Container mt={10} onSubmit={handleSubmit(handleFormSubmit)} as="form">
					{status === 'failed' && (
						<Alert mb="4" status="error">
							<AlertIcon />
							<AlertDescription>
								{apiError?.code === 'ER_DUP_ENTRY'
									? `The Email already has an account, please login`
									: apiError?.message ?? 'Could not log you in, There seems to be an error'}
							</AlertDescription>
							{/* <CloseButton onClick={() => setApiErrorStatus(false)} position="absolute" right="8px" top="8px" /> */}
						</Alert>
					)}
					{/* Name Wrapper */}
					<Flex>
						{/* First Name */}
						<FormControl isInvalid={isFieldHasAnError('firstName')} mr="4" isRequired>
							<FormLabel htmlFor="firstName">First name</FormLabel>
							<Input placeholder="First Name" {...register('firstName')} />
							<FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
						</FormControl>
						{/* Last Name */}
						<FormControl>
							<FormLabel htmlFor="lastName">Last name</FormLabel>
							<Input placeholder="Last Name" {...register('lastName')} />
							<FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
						</FormControl>
					</Flex>

					{/* User Name */}
					<FormControl mt={4}>
						<FormLabel>User Name</FormLabel>
						<Input placeholder="johnDoe" {...register('userName')} />
					</FormControl>

					{/* Email */}
					<FormControl mt={4} isInvalid={isFieldHasAnError('email')} isRequired>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input type="email" autoComplete="off" placeholder="sample@emample.com" {...register('email')} />
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>

					{/* Password */}
					<FormControl mt={4} isInvalid={isFieldHasAnError('password')} isRequired>
						<FormLabel htmlFor="password">Password</FormLabel>
						{/* TODO: Add view password functionality */}
						<Input
							variant="filled"
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							{...register('password')}
						/>
						<IconButton
							position="absolute"
							background="transparent"
							right="0"
							zIndex={5}
							aria-label="show password"
							onClick={() => setShowPassword(!showPassword)}
							icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
						/>
						<FormErrorMessage>
							{errors.password?.message === 'PASSWORD_SUGGESTION' && (
								<UnorderedList>
									<ListItem>One Upper Case Letter </ListItem>
									<ListItem>One Lower Case Letter</ListItem>
									<ListItem>At Least One Numeric Value</ListItem>
									<ListItem>At Least One Special Character</ListItem>
									<ListItem>Minimum Eight Characters</ListItem>
								</UnorderedList>
							)}
						</FormErrorMessage>
					</FormControl>

					{/* Submit Button */}
					<Flex mt={16} justifyContent="center">
						<Button
							background="blue.600"
							isLoading={status === 'pending'}
							disabled={!isDirty || !isValid}
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
	const { token } = req.cookies;

	if (token) {
		console.log('THE TOKEN IS PRESENT', token);
		try {
			const userResponse = await fetchUserProfile(token);
			console.log(userResponse, 'The User Response');
			res.writeHead(307, { location: '/app/dashboard' });
			res.end();
			return {
				props: {
					loggedIn: true,
				},
			};
		} catch (error) {
			console.log('The Error caught in Login page user validation is', error);
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

export default Register;
