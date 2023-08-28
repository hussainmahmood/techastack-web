import { z } from 'zod';
export const registerSchema = z
	.object({
		name: z
			.string({
				required_error: 'Name is required',
				invalid_type_error: 'Name must be a string'
			})
			.min(1, { message: 'Name is required' })
			.max(30, { message: 'Name must be less than 30 characters' })
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
			.min(6, { message: 'Password must contain atleast 6 characters' })
			.max(64, { message: 'Password must be less than 64 characters' })
			.trim(),
		confirm_password: z
			.string({
				required_error: 'Confirming password is required',
				invalid_type_error: 'Confirm password must be a string'
			})
			.trim()
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['confirm_password'] // path of error
	});
