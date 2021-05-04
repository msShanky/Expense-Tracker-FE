import { default as NextLink } from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import { Center, Flex, Text, Link, Container, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { UnorderedList, Input, ListItem } from '@chakra-ui/react';
// import { } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormValues } from '../interfaces';
import * as yup from 'yup';
import { GetServerSideProps } from 'next';
import { fetchUserProfile } from '../utils/FetchUserProfile';

const schema = yup.object().shape({
	firstName: yup
		.string()
		.required('First Name is required')
		.min(3, 'First Name should be greater than 3 characters')
		.max(25, 'First Name should be less than 25 characters'),
	lastName: yup.string(),
	email: yup.string().email(),
	password: yup
		.string()
		.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `PASSWORD_SUGGESTION`),
});

const Register = (): ReactElement => {
	const { handleSubmit, register, formState } = useForm<RegisterFormValues>({
		resolver: yupResolver(schema),
	});
	const { errors } = formState;

	const handleFormSubmit = (data: RegisterFormValues) => {
		console.log(data, 'Params from the on submit function');
	};

	const isFieldHasAnError = (fieldName: string) => {
		return Object.prototype.hasOwnProperty.call(errors, fieldName);
	};

	return (
		<Layout title="Expense Tracker | Sign Up">
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
							<FormLabel htmlFor="lastName">last name</FormLabel>
							<Input placeholder="Last Name" {...register('lastName')} />
							<FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
						</FormControl>
					</Flex>

					{/* Email */}
					<FormControl mt={4} isInvalid={isFieldHasAnError('email')} isRequired>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input type="email" autoComplete="off" placeholder="sample@emample.com" {...register('email')} />
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>

					{/* Password */}
					<FormControl mt={4} isInvalid={isFieldHasAnError('password')} isRequired>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input type="password" placeholder="Password" {...register('password')} />
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
						<Button background="blue.600" isLoading={formState.isSubmitting} type="submit" w={'50%'}>
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
