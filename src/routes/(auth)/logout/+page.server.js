// import { SECRET_API_URI } from '$env/static/private';
// import { redirect } from '@sveltejs/kit';
// export async function load({ cookies, fetch }) {
// 	const response = await fetch(`${SECRET_API_URI}/auth/logout/`, {method: 'POST'});
// 	cookies.delete('sessionid', {path: '/'});
// 	throw redirect(302, '/');
// };
//
// export const actions = {
// 	default: async ({ cookies, fetch }) => {
// 		const response = await fetch(`${SECRET_API_URI}/auth/logout/`, {method: 'POST'});
// 		cookies.delete('sessionid', {path: '/'});
// 		throw redirect(302, '/');
// 	}
// };
