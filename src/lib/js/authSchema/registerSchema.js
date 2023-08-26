import { z } from 'zod';
export const registerSchema = z
	.object({
		first_name: z
			.string({
				required_error: 'First name is required',
				invalid_type_error: 'First name must be a string'
			})
			.min(1, { message: 'First name is required' })
			.max(30, { message: 'First name must be less than 30 characters' })
			.trim(),
		last_name: z
			.string({
				required_error: 'Last name is required',
				invalid_type_error: 'Last name must be a string'
			})
			.min(1, { message: 'Last name is required' })
			.max(30, { message: 'Last name must be less than 30 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' })
			.min(1, { message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email({ message: 'Must be a valid email address' }),
		password: z
			.string({
				required_error: 'Password is required',
				invalid_type_error: 'Password must be a string'
			})
			.min(10, { message: 'Password must contain atleast 10 characters' })
			.max(64, { message: 'Password must be less than 64 characters' })
			.trim(),
		password_confirm: z
			.string({
				required_error: 'Confirming password is required',
				invalid_type_error: 'Confirm password must be a string'
			})
			.trim()
	})
	.refine((data) => data.password === data.password_confirm, {
		message: 'Passwords do not match',
		path: ['password_confirm'] // path of error
	});
