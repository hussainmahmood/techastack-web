import { SECRET_API_URI } from '$env/static/private';
import { redirect } from '@sveltejs/kit'
import { generateRandomString } from '$lib/js';

export async function load({ fetch, cookies }) {
	if (cookies.get('csrftoken') === undefined || cookies.get('xsrftoken') === undefined) {
		cookies.set('csrftoken', `${generateRandomString(32)}`, {
			path: '/',
			sameSite: 'strict',
			secure: false
		});
		const response = await fetch(`${SECRET_API_URI}/auth/get_csrf_token/`);
		const data = await response.json();
		cookies.set('xsrftoken', `${data['csrftoken']}`, {
			path: '/',
			sameSite: 'strict',
			secure: false
		});
	}
}

import { loginSchema } from '$lib/js';
import { ZodError } from 'zod';
export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
        // eslint-disable-next-line no-unused-vars
		const { password, ...rest } = formData;
        
        try {
			loginSchema.parse(formData);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors } = err.flatten();
				const [key, value] = Object.entries(fieldErrors)[0];
				const error = value[0] ;
				return {
					data: rest,
					error: error
				};
			}
		}
		// eslint-disable-next-line no-unused-vars
		const response = await fetch(`${SECRET_API_URI}/auth/login/`, {
			body: JSON.stringify(formData),
			method: 'POST'
		});
        
        const data = await response.json()
        if (response.status === 200) {
            cookies.set('sessionid', `${data['sessionid']}`, {
                path: '/',
                sameSite: 'strict',
                secure: false
            });
            throw redirect(302, '/dashboard');
        }
        if (response.status === 400) {
            return {
                data: rest,
                error: data.detail
            };
        } 
	}
};
