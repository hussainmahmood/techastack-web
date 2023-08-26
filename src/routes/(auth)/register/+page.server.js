import { redirect } from '@sveltejs/kit'

/** @function generateRandomString @param {number} length @returns {string}*/
const generateRandomString = (length) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, cookies }) {
	if (cookies.get('csrftoken') === undefined || cookies.get('xsrftoken') === undefined) {
		cookies.set('csrftoken', `${generateRandomString(32)}`, {
			path: '/',
			sameSite: 'strict',
			secure: false
		});
		const response = await fetch(`http://127.0.0.1:8123/api/auth/get_csrf_token/`);
		const data = await response.json();
		cookies.set('xsrftoken', `${data['csrftoken']}`, {
			path: '/',
			sameSite: 'strict',
			secure: false
		});
	}
}

import { registerSchema } from '$lib/js';
import { ZodError } from 'zod';
export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
        // eslint-disable-next-line no-unused-vars
		const { password, confirm_password, ...rest } = formData;
        console.log(rest)
        try {
			registerSchema.parse(formData);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
                console.log(errors)
				return {
					data: rest,
					errors: errors
				};
			}
		}
		// eslint-disable-next-line no-unused-vars
		const response = await fetch(`http://127.0.0.1:8123/api/auth/register/`, {
			body: JSON.stringify(formData),
			method: 'POST'
		});
        
        const data = await response.json()
        console.log(data)
        if (response.status === 200) {
            cookies.set('sessionid', `${data['sessionid']}`, {
                path: '/',
                sameSite: 'strict',
                secure: false
            });
            throw redirect(302, '/');
        }
        if (response.status === 400) {
            return {
                data: rest,
                errors: {'server': data.detail}
            };
        } 
	}
};
